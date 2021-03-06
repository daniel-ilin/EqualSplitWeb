import { SessionTab } from ".././SessionTab/SessionTab";
import styles from "./SessionBar.module.css";
import { useSelectSession } from "../../context/SessionContext";
import { useUserDataModelContext } from "../../context/UserDataModelContext";

type SessionBarProps = {
  setUsersBarVisible: () => void;
  usersBarVisible: boolean;
};

export const SessionBar = (props: SessionBarProps) => {
  const { getCurrentModel } = useUserDataModelContext();
  const { sessions } = getCurrentModel();

  const { getActiveSession } = useSelectSession();

  return (
    <div className={styles.sidebar}>
      <ul>
        {sessions !== undefined &&
          sessions.map((session) => {
            return (
              <SessionTab
                key={session.id}
                session={session}
                isActive={session.id === getActiveSession()}
                setUsersBarVisible={props.setUsersBarVisible}
                usersBarVisible={props.usersBarVisible}
              ></SessionTab>
            );
          })}
      </ul>
      <div className={styles["sidebar-bottom"]}></div>
    </div>
  );
};
