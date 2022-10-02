import { SessionTab } from ".././SessionTab/SessionTab";
import styles from "./SessionBar.module.scss";
import { useSelectSession } from "../../context/SessionContext";
import { useUserDataModelContext } from "../../context/UserDataModelContext";

type SessionBarProps = {
  // setUsersBarVisible: () => void;
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
              ></SessionTab>
            );
          })}
      </ul>
      <div className={styles["sidebar-bottom"]}></div>
    </div>
  );
};
