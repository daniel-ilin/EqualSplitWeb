import userData from "../data/sessions.json";
import { SessionTab } from "./SessionTab";
import styles from "./SessionBar.module.css";
import { Header } from "./Header";
import { useSelectSession } from "../context/SessionContext";

type SessionBarProps = {
  setUsersBarVisible: () => void;
  usersBarVisible: boolean;
};

export const SessionBar = (props: SessionBarProps) => {
  const { sessions } = userData;

  const { getActiveSession } = useSelectSession();

  return (
    <div className={styles.sidebar}>      
      <ul>
        {sessions.map((session) => {
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
      <div className={styles["sidebar-bottom"]}>      
      </div>      
    </div>
  );
};
