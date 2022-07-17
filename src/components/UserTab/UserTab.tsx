import { useSelectSession } from "../../context/SessionContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import styles from "./UserTab.module.css";
import arrowsStyles from ".././arrows/Arrow.module.css";

type UserTabProps = {
  user: User;
  isActive: boolean;
  usersBarVisible: boolean;
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

  const { setActiveUser } = useSelectSession();

  const arrowCSS = props.usersBarVisible && isActive ? "left" : "right";

  return (
    <>
      <li
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
          <div>
            <h2>{user.username}</h2>
            <p>{`Spent total ${formatCurrency(getTotalSpent(user))}`}</p>
          </div>
          <i className={arrowsStyles[arrowCSS]}></i>
        </div>
      </li>
    </>
  );
};
