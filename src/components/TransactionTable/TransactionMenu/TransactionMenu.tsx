import styles from "./TransactionMenu.module.css";

type TransactionMenuProps = {
  hideMenuHandler: () => void;
};

export const TransactionMenu = (props: TransactionMenuProps) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className={styles.backdrop} onClick={props.hideMenuHandler} />
        <div className={styles.menu}>
          <button>Edit</button>

          <div className={styles.divider} />

          <button>Delete</button>
        </div>
      </div>
    </>
  );
};
