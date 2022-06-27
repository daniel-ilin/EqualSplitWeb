import styles from "./MessageInput.module.css";

export const MessageInput = () => {
  return (
    <>
      <div className={styles["whole-form"]}>
        <form>
          <input
            type="text"
            id="amount"
            name="amount"
            placeholder="$0.00"
            className={styles["amount"]}
          ></input>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            className={styles["description"]}
          ></input>
          <input
            type="submit"
            value="Add"
            className={styles["add-button"]}
          ></input>
        </form>
      </div>
    </>
  );
};
