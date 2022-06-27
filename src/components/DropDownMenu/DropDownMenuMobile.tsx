import styles from "./DropDownMenuMobile.module.css";

export const DropDownMenuMobile = () => {
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
