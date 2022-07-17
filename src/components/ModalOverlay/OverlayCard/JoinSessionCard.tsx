import { useEffect, useRef } from "react";
import { useModalContext } from "../../../context/ModalContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";
import useHttp from "../../../hooks/use-http";
import apiService from "../../../utilities/APIService";
import styles from "./JoinSessionCard.module.css";

export const JoinSessionCard = () => {
  const { getModalState, toggleModal } = useModalContext();

  const {
    sendRequest: sendGetDataRequest,
    status: getDataStatus,
    data: userData,
    error: getDataError,
  } = useHttp<UserData | undefined>(apiService.getAllUserData, false);

  const { setCurrentModel } = useUserDataModelContext();

  useEffect(() => {
    if (userData !== null) {
      setCurrentModel(userData);
    }
  }, [userData, setCurrentModel]);

  const sessionCodeRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal(getModalState().modalState.modalType);
  };

  const confirmButtonHandler = async () => {
    console.log("Confirm handler running!");
    if (sessionCodeRef.current !== null) {
      const response = await apiService.joinSession(
        sessionCodeRef.current.value
      );
      toggleModal(getModalState().modalState.modalType);
      if (response.error !== undefined) {
        return;
      }

      sendGetDataRequest();
    }
  };

  return (
    <>
      <div className={styles.card}>
        <span className={styles["v-group"]}>
          <h2>Join session</h2>
          <p>Enter session code</p>
          <input
            placeholder="######"
            ref={sessionCodeRef}
            onKeyPress={(event) => {
              if (
                sessionCodeRef.current?.value !== undefined &&
                sessionCodeRef.current?.value.length > 5
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
