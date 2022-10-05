import { useRef } from "react";
import { useLoader } from "../../../context/LoadingContext";
import { useModalContext } from "../../../context/ModalContext";
import { useToastify } from "../../../context/ToastContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";
import apiService from "../../../utilities/APIService";
import styles from "./OverlayCards.module.scss";

export const ProfileCard = () => {
  const { getModalState, toggleModal } = useModalContext();
  const { setLoader } = useLoader();
  const { getCurrentModel, setCurrentModel } = useUserDataModelContext();

  const userDataModel = getCurrentModel().activeUser;

  const profileNameRef = useRef<HTMLInputElement>(null);
  const { sendAlertToast } = useToastify();

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      if (profileNameRef.current !== null) {
        setLoader(true);
        const response = await apiService.changeUsername(
          profileNameRef.current.value
        );

        const userData = await apiService.getAllUserData();
        setLoader(false);
        setCurrentModel(userData);

        toggleModal({ modalType: getModalState().modalState.modalType });
        if (response.error !== undefined) {
          return;
        }
      }
    } catch (error: any) {
      setLoader(false);
      sendAlertToast({ title: error.message ?? "Error" });
    }
  };

  return (
    <>
      <form className={styles.card} onSubmit={confirmButtonHandler}>
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
              marginTop: "13px",
              color: "#747474",
            }}
            defaultValue={userDataModel.email}
          />
        </span>
        <span className={styles["h-group"]}>
          <input
            type="button"
            value="Cancel"
            className={styles.cancel}
            onClick={cancelButtonHandler}
          />

          <input type={"submit"} className={styles.confirm} value={"Confirm"} />
        </span>
      </form>
    </>
  );
};
