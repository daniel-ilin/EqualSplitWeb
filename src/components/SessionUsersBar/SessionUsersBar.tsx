import { useEffect, useState } from "react";
import { useSelectSession } from "../../context/SessionContext";
import styles from "./SessionUsersBar.module.scss";
import { UserTab } from ".././UserTab/UserTab";
import { useUserDataModelContext } from "../../context/UserDataModelContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SessionUserBarProps = {};

export const SessionUsersBar = (props: SessionUserBarProps) => {
  const { getCurrentModel } = useUserDataModelContext();
  const { sessions } = getCurrentModel();

  const [selectedSessionUsers, setSelectedSessionUsers] = useState<User[]>();

  const { getActiveSession, getActiveUser } = useSelectSession();

  const currentSession =
    sessions && sessions.find((session) => session.id === getActiveSession());

  const copyTextHandler = () => {
    if (currentSession?.sessioncode) {
      navigator.clipboard.writeText(currentSession?.sessioncode);
      // alert("Copied the text: " + currentSession?.sessioncode);
      toast("Copied the text: " + currentSession?.sessioncode);
    }
  };

  useEffect(() => {
    currentSession && setSelectedSessionUsers(currentSession.users);
  }, [currentSession]);

  return (
    <>
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
        {currentSession?.sessioncode && (
          <div className={styles.vContainer}>
            <p>{currentSession?.sessioncode}</p>
            <button className={styles.bottomButton} onClick={copyTextHandler}>
              Copy invite code
            </button>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};
