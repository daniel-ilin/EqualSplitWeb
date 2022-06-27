import { formatCurrency } from "../utilities/formatCurrency";
import styles from "./SessionTab.module.css";
import personIcon from "../imgs/person-icon.png"; // relative path to image
import { useSelectSession } from "../context/SessionContext";
import arrowsStyles from "./arrows/Arrow.module.css";

type SessionTabProps = {
  session: Session;
  isActive: boolean;
  setUsersBarVisible: () => void;
  usersBarVisible: boolean;
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
  const { setActiveSession, removeActiveUser } = useSelectSession();

  const { session, isActive, setUsersBarVisible, usersBarVisible } = props;

  const arrowCSS = usersBarVisible && isActive ? "left" : "right";

  return (
    <>
      <li
        onClick={() => {
          setActiveSession(session.id);
          (isActive || !usersBarVisible) && setUsersBarVisible();
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
            isActive && usersBarVisible
              ? `${styles["spacer-container"]}`
              : `${styles["spacer-container"]} ${styles["inactive-translate"]}`
          }
        >
          <div>
            <h1>{session.name}</h1>
            <div className={styles["session-info"]}>
              <span>
                <img
                  src={personIcon}
                  style={{
                    width: "13px",
                    height: "16px",
                    objectFit: "fill",
                    marginTop: "-25%",
                    marginRight: "0.3rem",
                  }}
                  alt="People:"
                ></img>
              </span>
              <span className={styles["session-info-item"]}>
                <p>{session.users.length}</p>
              </span>
              <p>{formatCurrency(getTotalSessionAmount(session.users))}</p>
            </div>
          </div>
          <i className={arrowsStyles[arrowCSS]}></i>
        </div>
      </li>
    </>
  );
};
