import { useEffect, useRef } from "react";
import { useModalContext } from "../../../context/ModalContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";
import useHttp from "../../../hooks/use-http";
import apiService from "../../../utilities/APIService";
import styles from "./ProfileCard.module.css";

export const ProfileCard = () => {
  const { getModalState, toggleModal } = useModalContext();

  const {
    sendRequest: sendGetDataRequest,
    status: getDataStatus,
    data: userData,
    error: getDataError,
  } = useHttp<UserData | undefined>(apiService.getAllUserData, false);

  const { getCurrentModel, setCurrentModel } = useUserDataModelContext();

  useEffect(() => {
    if (userData !== null) {
      setCurrentModel(userData);
    }
  }, [userData, setCurrentModel]);

  const userDataModel = getCurrentModel().activeUser;

  const profileNameRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal(getModalState().modalState.modalType);
  };

  const confirmButtonHandler = async () => {
    console.log("Confirm handler running!");
    if (profileNameRef.current !== null) {
      const response = await apiService.postSession(
        profileNameRef.current?.value
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
          <h2>Profile</h2>
          <p>Your profile information</p>
          <input
            defaultValue={userDataModel.name}
            ref={profileNameRef}
            onKeyPress={(event) => {
              if (
                profileNameRef.current?.value !== undefined &&
                profileNameRef.current?.value.length > 25
              ) {
                event.preventDefault();
              }
            }}
          />
          <input
            style={{
              pointerEvents: "none",
              marginTop: "0.8rem",
              color: "#747474",
            }}
            value={userDataModel.email}
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
