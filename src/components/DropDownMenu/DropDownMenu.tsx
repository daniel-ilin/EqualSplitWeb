import styles from "./DropDownMenu.module.css";

export const DropDownMenu = () => {
  return (
    <>
      <div className={styles.menu}>
        <button>Create Session</button>

        <div className={styles.divider} />

        <button>Join Session</button>

        <div className={styles.divider} />

        <button>Profile</button>
      </div>
    </>
  );
};
