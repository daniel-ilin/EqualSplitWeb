import { useModalContext } from "../../context/ModalContext";
import { ModalType } from "../../types/ModalType";
import styles from "./DropDownMenu.module.css";

export const DropDownMenu = () => {
  const { toggleModal } = useModalContext();

  const joinSessionHandler = () => {
    toggleModal(ModalType.joinSession);
  };

  const createSessionHandler = () => {
    toggleModal(ModalType.createSession);
  };

  const profileHandler = () => {
    toggleModal(ModalType.profile);
  };

  return (
    <>
      <div className={styles.menu}>
        <button onClick={createSessionHandler}>Create Session</button>

        <div className={styles.divider} />

        <button onClick={joinSessionHandler}>Join Session</button>

        <div className={styles.divider} />

        <button onClick={profileHandler}>Profile</button>
      </div>
    </>
  );
};
