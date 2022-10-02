import { useRef } from "react";
import { useLoader } from "../../../context/LoadingContext";
import { useModalContext } from "../../../context/ModalContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";
import apiService from "../../../utilities/APIService";
import styles from "./OverlayCards.module.scss";

export const ProfileCard = () => {
  const { getModalState, toggleModal } = useModalContext();
  const { setLoader } = useLoader();
  const { getCurrentModel } = useUserDataModelContext();

  const userDataModel = getCurrentModel().activeUser;

  const profileNameRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async () => {
    try {
      if (profileNameRef.current !== null) {
        setLoader(true);
        const response = await apiService.changeUsername(
          profileNameRef.current.value
        );

        toggleModal({ modalType: getModalState().modalState.modalType });
        if (response.error !== undefined) {
          return;
        }
      }
    } catch (error) {
      console.log(error);
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
            defaultValue={userDataModel.email}
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
