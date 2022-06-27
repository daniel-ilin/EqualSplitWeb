import { useEffect, useState } from "react";
import { useSelectSession } from "../context/SessionContext";
import userData from "../data/sessions.json";
import styles from "./SessionUsersBar.module.css";
import { UserTab } from "./UserTab";

type SessionUserBarProps = {  
  usersBarVisible: boolean;
};

export const SessionUsersBar = (props: SessionUserBarProps) => {
  const { sessions } = userData;

  const [selectedSessionUsers, setSelectedSessionUsers] = useState<User[]>();

  const { getActiveSession, getActiveUser } = useSelectSession();

  useEffect(() => {
    const currentSessionId = getActiveSession();
    setSelectedSessionUsers(
      sessions.find((session) => session.id === currentSessionId)?.users
    );
  }, [getActiveSession, sessions, setSelectedSessionUsers]);

  return (    
      <div className={styles.sidebar}>
        {/* <SessionHeader /> */}
        <ul>
          {selectedSessionUsers?.map((user) => {
            return (
              <UserTab
                usersBarVisible={props.usersBarVisible}
                key={user.userid}
                user={user}
                isActive={user.userid === getActiveUser()}
              ></UserTab>
            );
          })}
        </ul>
        <div className={styles["sidebar-bottom"]}></div>
      </div>    
  );
};
