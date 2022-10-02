import { useModalContext } from "../../context/ModalContext";
import { ModalType } from "../../types/ModalType";
import styles from "./DropDownMenu.module.scss";

export const DropDownMenu = () => {
  const { toggleModal } = useModalContext();

  const joinSessionHandler = () => {
    toggleModal({ modalType: ModalType.joinSession });
  };

  const createSessionHandler = () => {
    toggleModal({ modalType: ModalType.createSession });
  };

  const profileHandler = () => {
    toggleModal({ modalType: ModalType.profile });
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
