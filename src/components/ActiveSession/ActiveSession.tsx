import styles from "./ActiveSession.module.css";
import { MessageInput } from ".././ChatView/MessageInput";
import { TransactionTable } from ".././TransactionTable/TransactionTable";
import { InfoSection } from ".././InfoSection/InfoSection";
import { useSelectSession } from "../../context/SessionContext";
import { useUserDataModelContext } from "../../context/UserDataModelContext";
import { findOwers } from "../../utilities/Calculator";

export const ActiveSession = () => {
  const { getActiveUser, getActiveSession } = useSelectSession();
  const { getCurrentModel } = useUserDataModelContext();

  let editable = false;

  if (
    getCurrentModel().activeUser !== undefined &&
    getCurrentModel().sessions !== undefined &&
    getActiveSession() !== undefined
  ) {
    editable =
      getActiveUser() === getCurrentModel().activeUser.id ||
      getCurrentModel().activeUser.id ===
        getCurrentModel().sessions.find(
          (session) => session.id === getActiveSession()
        )?.ownerid;
  }

  const data = getCurrentModel();

  const session =
    data.sessions !== undefined
      ? data.sessions.find((session) => session.id === getActiveSession())
      : undefined;

  const calculatedUsers = session !== undefined ? findOwers(session) : [];

  return (
    <>
      <div className={styles["session-frame"]}>
        <InfoSection calculatedUsers={calculatedUsers}></InfoSection>
        <TransactionTable
          editable={editable}
          calculatedUsers={calculatedUsers}
        ></TransactionTable>
        {editable && <MessageInput></MessageInput>}
      </div>
    </>
  );
};
