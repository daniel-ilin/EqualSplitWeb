import { useModalContext } from "../../context/ModalContext";
import styles from "./ModalOverlay.module.css";
import { CreateSessionCard } from "./OverlayCard/CreateSessionCard";
import { JoinSessionCard } from "./OverlayCard/JoinSessionCard";
import { ProfileCard } from "./OverlayCard/ProfileCard";

const MODAL_STATES = {
  0: <CreateSessionCard />,
  1: <JoinSessionCard />,
  2: <ProfileCard />,
};

export const ModalOverlay = () => {
  const { getModalState, toggleModal } = useModalContext();

  const hideModalHandler = () => {
    toggleModal(getModalState().modalState.modalType);
  };

  const modalType = getModalState().modalState.modalType;

  return (
    <div>
      <div className={styles.backdrop} onClick={hideModalHandler} />
      <div className={styles.menu}>
        {modalType !== null && MODAL_STATES[`${modalType}`]}
      </div>
    </div>
  );
};
