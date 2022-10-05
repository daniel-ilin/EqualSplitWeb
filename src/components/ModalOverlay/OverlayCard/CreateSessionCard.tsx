import { useRef } from "react";
import { useLoader } from "../../../context/LoadingContext";
import { useModalContext } from "../../../context/ModalContext";
import { useSelectSession } from "../../../context/SessionContext";
import { useToastify } from "../../../context/ToastContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";

import apiService from "../../../utilities/APIService";
import styles from "./OverlayCards.module.scss";

export const CreateSessionCard = () => {
  const { getModalState, toggleModal } = useModalContext();
  const { setLoader } = useLoader();
  const { setActiveSession, setActiveUser } = useSelectSession();
  const { setCurrentModel } = useUserDataModelContext();

  const sessionNameRef = useRef<HTMLInputElement>(null);

  const { sendAlertToast } = useToastify();

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (
        sessionNameRef.current !== null &&
        sessionNameRef.current.value.length > 0
      ) {
        setLoader(true);
        const response: any = await apiService.postSession(
          sessionNameRef.current?.value
        );

        toggleModal({ modalType: getModalState().modalState.modalType });

        const userData = await apiService.getAllUserData();
        setLoader(false);
        setCurrentModel(userData);

        setActiveSession(response.sessionid);
        setActiveUser(response.ownerid);
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
