import styles from "./ActiveSession.module.css";
import { MessageInput } from "./ChatView/MessageInput";

export const ActiveSession = () => {
  return (
    <>
      <div className={styles["session-frame"]}>
        <MessageInput></MessageInput>
      </div>
    </>
  );
};
