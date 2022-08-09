import styles from "./ActiveSession.module.css";
import { MessageInput } from ".././ChatView/MessageInput";
import { TransactionTable } from ".././TransactionTable/TransactionTable";
import { InfoSection } from ".././InfoSection/InfoSection";
import { useSelectSession } from "../../context/SessionContext";
import { useUserDataModelContext } from "../../context/UserDataModelContext";

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

  return (
    <>
      <div className={styles["session-frame"]}>
        <InfoSection></InfoSection>
        <TransactionTable editable={editable}></TransactionTable>
        {editable && <MessageInput></MessageInput>}
      </div>
    </>
  );
};
