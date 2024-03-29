import { useModalContext } from "../../context/ModalContext";
import styles from "./ModalOverlay.module.css";
import { CreateSessionCard } from "./OverlayCard/CreateSessionCard";
import { EditSessionCard } from "./OverlayCard/EditSessionCard/EditSessionCard";
import { EditTransactionCard } from "./OverlayCard/EditTransactionCard/EditTransactionCard";
import { EnterActivationCode } from "./OverlayCard/EnterActivationCode/EnterActivationCode";
import { JoinSessionCard } from "./OverlayCard/JoinSessionCard";
import { ProfileCard } from "./OverlayCard/ProfileCard";
import { RequestPasswordReset } from "./OverlayCard/RequestPasswordReset/RequestPasswordReset";

const MODAL_STATES = {
  0: <CreateSessionCard />,
  1: <JoinSessionCard />,
  2: <ProfileCard />,
  3: <EditTransactionCard />,
  4: <EditSessionCard />,
  5: <RequestPasswordReset />,
  6: <EnterActivationCode />,
};

export const ModalOverlay = () => {
  const { getModalState, toggleModal } = useModalContext();

  const hideModalHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
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
