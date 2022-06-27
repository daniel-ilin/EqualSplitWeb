import styles from "./DotsButton.module.css";

type DotsButtonProps = {
  onMenuExpanded: () => void;
  menuExpanded: boolean;
};

export const DotsButton = (props: DotsButtonProps) => {
  return (
    <>
      <div
        className={
          !props.menuExpanded
            ? styles["button-container"]
            : `${styles["button-container"]} ${styles["active"]}`
        }
        onClick={() => props.onMenuExpanded()}
      >
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </>
  );
};
