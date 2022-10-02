import { useSelectSession } from "../../context/SessionContext";
import { ActiveSession } from "../ActiveSession/ActiveSession";
import { SessionUsersBar } from "../SessionUsersBar/SessionUsersBar";
import styles from "./ActiveSessionContainer.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import { useEffect } from "react";

type ActiveSessionContainerProps = {};

export const ActiveSessionContainer = (props: ActiveSessionContainerProps) => {
  const { getActiveUser } = useSelectSession();

  // useEffect(() => {
  //   setUsersBarVisible(getActiveUser() !== "");
  // }, []);

  return (
    <>
      <>
        <div className={styles["active-session-container"]}>
          <span style={{ width: "30%" }}>
            <SessionUsersBar />
          </span>
          <span style={{ width: "70%" }}>
            {getActiveUser() !== "" && <ActiveSession></ActiveSession>}
          </span>
        </div>
      </>
    </>
  );
};
