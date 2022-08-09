import { useEffect, useRef } from "react";
import { useModalContext } from "../../../context/ModalContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";
import useHttp from "../../../hooks/use-http";
import apiService from "../../../utilities/APIService";
import styles from "./CreateSessionCard.module.css";

export const CreateSessionCard = () => {
  const { getModalState, toggleModal } = useModalContext();

  const {
    sendRequest: sendGetDataRequest,
    data: userData,    
  } = useHttp<UserData | undefined>(apiService.getAllUserData, false);

  const { setCurrentModel } = useUserDataModelContext();

  useEffect(() => {
    if (userData !== null) {
      setCurrentModel(userData);
    }
  }, [userData, setCurrentModel]);

  const sessionNameRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal(getModalState().modalState.modalType);
  };

  const confirmButtonHandler = async () => {
    try {
      if (
        sessionNameRef.current !== null &&
        sessionNameRef.current.value.length > 0
      ) {
        const response = await apiService.postSession(
          sessionNameRef.current?.value
        );
        toggleModal(getModalState().modalState.modalType);
        if (response.error !== undefined) {
          return;
        }

        sendGetDataRequest();
      }
    } catch (error) {
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
