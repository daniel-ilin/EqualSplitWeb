import { useEffect, useState } from "react";
import { useSelectSession } from "../../context/SessionContext";
import styles from "./SessionUsersBar.module.scss";
import { UserTab } from ".././UserTab/UserTab";
import { useUserDataModelContext } from "../../context/UserDataModelContext";

type SessionUserBarProps = {};

export const SessionUsersBar = (props: SessionUserBarProps) => {
  const { getCurrentModel } = useUserDataModelContext();
  const { sessions } = getCurrentModel();

  const [selectedSessionUsers, setSelectedSessionUsers] = useState<User[]>();

  const { getActiveSession, getActiveUser } = useSelectSession();

  useEffect(() => {
    const currentSessionId = getActiveSession();
    sessions !== undefined &&
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
