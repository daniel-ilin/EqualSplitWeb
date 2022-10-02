import { useSelectSession } from "../../context/SessionContext";
import { ActiveSession } from "../ActiveSession/ActiveSession";
import { SessionUsersBar } from "../SessionUsersBar/SessionUsersBar";
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
            <span style={{ width: "30%" }}>
              <SessionUsersBar usersBarVisible={usersBarVisible} />
            </span>
            <span style={{ width: "70%" }}>
              {getActiveUser() !== "" && <ActiveSession></ActiveSession>}
            </span>
          </div>
        </>
      </CSSTransition>
    </>
  );
};
