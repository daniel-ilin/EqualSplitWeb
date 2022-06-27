import { useSelectSession } from "../../context/SessionContext";
import { ActiveSession } from "../ActiveSession";
import { SessionUsersBar } from "../SessionUsersBar";
import styles from "./ActiveSessionContainer.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import { useEffect } from "react";

type ActiveSessionContainerProps = {
  usersBarVisible: boolean;
  setUsersBarVisible: (arg0: boolean) => void;
};

export const ActiveSessionContainer = (props: ActiveSessionContainerProps) => {
  const { usersBarVisible, setUsersBarVisible } = props;
  const { getActiveUser } = useSelectSession();

  useEffect(() => {
    setUsersBarVisible(getActiveUser() !== "");
  }, []);

  return (
    <>
      <CSSTransition
        in={usersBarVisible}
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={60}
        classNames={{
          enter: "",
          enterActive: styles["modal-open"],
          exit: "",
          exitActive: styles["modal-closed"],
        }}
      >
        <>
          <div className={styles["active-session-container"]}>
            <span style={{ minWidth: "250px", width: "30%", float: "left" }}>
              <SessionUsersBar usersBarVisible={usersBarVisible} />
            </span>
            {getActiveUser() !== "" && (
              <span style={{ width: "70%", overflow: "hidden" }}>
                <ActiveSession></ActiveSession>
              </span>
            )}
          </div>
        </>
      </CSSTransition>
    </>
  );
};
