import { useRef } from "react";
import { useLoader } from "../../../../context/LoadingContext";
import { useModalContext } from "../../../../context/ModalContext";
import { useSelectSession } from "../../../../context/SessionContext";
import { useUserDataModelContext } from "../../../../context/UserDataModelContext";

import apiService from "../../../../utilities/APIService";
import styles from ".././OverlayCards.module.scss";

export const RequestActivationCode = () => {
  const { getModalState, toggleModal } = useModalContext();
  //   const { setLoader } = useLoader();
  //   const { setActiveSession, setActiveUser } = useSelectSession();
  //   const { setCurrentModel } = useUserDataModelContext();

  const sessionNameRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async () => {};

  return (
    <>
      <div className={styles.card}>
        <span className={styles["v-group"]}>
          <h2>Password reset</h2>
          <p>Enter your email for the reset link</p>
          <input
            placeholder="Email"
            ref={sessionNameRef}
            onKeyPress={(event) => {
              if (
                sessionNameRef.current?.value !== undefined &&
                sessionNameRef.current?.value.length > 30
              ) {
                event.preventDefault();
              }
            }}
          />
        </span>
        <span className={styles["h-group"]}>
          <button className={styles.cancel} onClick={cancelButtonHandler}>
            Cancel
          </button>
          <button className={styles.confirm} onClick={confirmButtonHandler}>
            Send Link
          </button>
        </span>
      </div>
    </>
  );
};
