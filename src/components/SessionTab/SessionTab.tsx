import { formatCurrency } from "../../utilities/formatCurrency";
import styles from "./SessionTab.module.scss";
import personIcon from "../../imgs/person-icon.png"; // relative path to image
import { ReactComponent as PersonImage } from "../../imgs/person-icon.svg";
import { useSelectSession } from "../../context/SessionContext";
import arrowsStyles from ".././arrows/Arrow.module.css";
import { useState } from "react";
import { SessionMenu } from "./SessionMenu/SessionMenu";

type SessionTabProps = {
  session: Session;
  isActive: boolean;
};

const getTotalSessionAmount = (users: User[]) => {
  let total: number = 0;
  for (let i in users) {
    for (let j in users[i].transactions) {
      const numToAdd = +users[i].transactions[j].amount;
      total += numToAdd;
    }
  }
  return total;
};

export const SessionTab = (props: SessionTabProps) => {
  const [menuExpanded, setMenuExpanded] = useState(false);

  const { setActiveSession, removeActiveUser } = useSelectSession();

  const [arrowShowing, setArrowShowing] = useState(false);

  const { session, isActive } = props;

  const mouseEnterHandler = () => {
    setArrowShowing(true);
  };

  const mouseLeaveHandler = () => {
    setArrowShowing(false);
  };

  const dropDownMenuHandler = () => {
    setMenuExpanded((prevState) => {
      return !prevState;
    });
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
          setActiveSession(session.id);
          // !usersBarVisible && setUsersBarVisible();
          !isActive && removeActiveUser();
        }}
        className={
          isActive
            ? `${styles["session-tab"]} ${styles["active"]}`
            : `${styles["session-tab"]}`
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
            <h1>{session.name}</h1>
            <div className={styles["session-info"]}>
              <PersonImage width="16px" height="16px" style={{marginBottom: "15px"}}/>
              <span className={styles["session-info-item"]}>
                <p>{session.users.length}</p>
              </span>
              <p>{formatCurrency(getTotalSessionAmount(session.users))}</p>
            </div>
          </div>
          {arrowShowing && (
            <div className={styles.itemarrow} onClick={dropDownMenuHandler}>
              <i className={arrowsStyles.bottom} />
            </div>
          )}
        </div>

        {menuExpanded && (
          <div style={{ position: "absolute", top: "24px", right: "120px" }}>
            <SessionMenu hideMenuHandler={hideMenuHandler} session={session} />
          </div>
        )}
      </li>
    </>
  );
};
