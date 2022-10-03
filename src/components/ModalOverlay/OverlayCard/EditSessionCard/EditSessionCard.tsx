import { useRef } from "react";
import { useLoader } from "../../../../context/LoadingContext";
import { useModalContext } from "../../../../context/ModalContext";
import { useUserDataModelContext } from "../../../../context/UserDataModelContext";
import apiService from "../../../../utilities/APIService";
import styles from "../OverlayCards.module.scss";

export const EditSessionCard = () => {
  const { getModalState, toggleModal } = useModalContext();
  const { setLoader } = useLoader();
  const { setCurrentModel } = useUserDataModelContext();

  const sessionNameRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async () => {
    try {
      let id = getModalState().modalState.session?.id;
      if (
        sessionNameRef.current !== null &&
        sessionNameRef.current.value.length > 0 &&
        id
      ) {
        setLoader(true);
        const response = await apiService.renameSession(
          id,
          sessionNameRef.current?.value
        );

        const userData = await apiService.getAllUserData();
        setLoader(false);
        setCurrentModel(userData);

        toggleModal({ modalType: getModalState().modalState.modalType });
        if (response.error !== undefined) {
          return;
        }
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <span className={styles["v-group"]}>
          <h2>Create new session</h2>
          <p>Enter new session name</p>
          <input
            placeholder="Session Name"
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
            Confirm
          </button>
        </span>
      </div>
    </>
  );
};
