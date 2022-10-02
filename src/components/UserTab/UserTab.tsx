import { useSelectSession } from "../../context/SessionContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import styles from "./UserTab.module.scss";
import arrowsStyles from ".././arrows/Arrow.module.css";
import { useState } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import { UserMenu } from "./UserMenu/UserMenu";
import { useUserDataModelContext } from "../../context/UserDataModelContext";

type UserTabProps = {
  user: User;
  isActive: boolean;
};

const getTotalSpent = (user: User) => {
  let total: number = 0;
  for (let i in user.transactions) {
    const numToAdd = +user.transactions[i].amount;
    total += numToAdd;
  }
  return total;
};

export const UserTab = (props: UserTabProps) => {
  const { user, isActive } = props;

  const [menuExpanded, setMenuExpanded] = useState(false);

  const { setActiveUser, getActiveSession } = useSelectSession();

  const [arrowShowing, setArrowShowing] = useState(false);

  const { getCurrentModel } = useUserDataModelContext();

  const isThisActiveUser = getCurrentModel().activeUser.id === user.userid;
  const ownerid = getCurrentModel().sessions.find(
    (session) => session.id === getActiveSession()
  )?.ownerid;
  const isUserSessionOwner = getCurrentModel().activeUser.id === ownerid;

  const mouseEnterHandler = () => {
    if (isThisActiveUser || isUserSessionOwner) {
      setArrowShowing(true);
    }
  };

  const mouseLeaveHandler = () => {
    setArrowShowing(false);
  };

  const dropDownMenuHandler = () => {
    setMenuExpanded(true);
  };

  const hideMenuHandler = () => {
    setMenuExpanded(false);
  };

  return (
    <>
      <li
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={() => {
          setActiveUser(user.userid);
        }}
        className={
          isActive
            ? `${styles["user-tab"]} ${styles["active"]}`
            : `${styles["user-tab"]}`
        }
      >
        <div
          className={
            isActive
              ? `${styles["spacer-container"]}`
              : `${styles["spacer-container"]} ${styles["inactive-translate"]}`
          }
        >
          <div style={{ width: "80%", overflow: "hidden" }}>
            <span className={styles.hstack}>
              <h2>{user.username}</h2>
              {isThisActiveUser && <h5>(You)</h5>}
              {user.userid === ownerid && <h5>(Owner)</h5>}
            </span>
            <p>{`Spent total ${formatCurrency(getTotalSpent(user))}`}</p>
          </div>
          {arrowShowing && (
            <div className={styles.itemarrow} onClick={dropDownMenuHandler}>
              <i className={arrowsStyles.bottom} />
            </div>
          )}
        </div>

        {(isThisActiveUser || isUserSessionOwner) && (
          <CSSTransition
            in={menuExpanded}
            mountOnEnter={true}
            unmountOnExit={true}
            timeout={0}
          >
            <div
              style={{
                position: "absolute",
                zIndex: "10",
                top: "26px",
                right: "120px",
              }}
            >
              <UserMenu
                hideMenuHandler={hideMenuHandler}
                userid={props.user.userid}
              />
            </div>
          </CSSTransition>
        )}
      </li>
    </>
  );
};
