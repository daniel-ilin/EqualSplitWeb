import styles from "./ActiveSession.module.css";
import { MessageInput } from "./ChatView/MessageInput";
import { TransactionTable } from "./TransactionTable/TransactionTable";
import { InfoSection } from "./InfoSection/InfoSection";

export const ActiveSession = () => {
  return (
    <>
      <div className={styles["session-frame"]}>
        <InfoSection></InfoSection>
        <TransactionTable></TransactionTable>
        <MessageInput></MessageInput>
      </div>
    </>
  );
};
