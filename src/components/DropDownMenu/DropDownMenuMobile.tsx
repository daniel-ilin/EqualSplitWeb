import { useModalContext } from "../../context/ModalContext";
import { ModalType } from "../../types/ModalType";
import styles from "./DropDownMenuMobile.module.css";

type DropDownMenuMobileProps = {
  hideMenuHandler: () => void;
};

export const DropDownMenuMobile = (props: DropDownMenuMobileProps) => {
  const { toggleModal } = useModalContext();

  // const [modalType, setModalType] = useState<ModalType>(ModalType.addSession)

  const createSessionHandler = () => {        
    props.hideMenuHandler();
    toggleModal(ModalType.createSession);
  };

  const joinSessionHandler = () => {    
    props.hideMenuHandler();
    toggleModal(ModalType.joinSession);
  };

  const profileHandler = () => {    
    props.hideMenuHandler();
    toggleModal(ModalType.profile);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={props.hideMenuHandler} />
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
