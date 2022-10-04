import { useRef } from "react";
import { useLoader } from "../../../context/LoadingContext";
import { useModalContext } from "../../../context/ModalContext";
import { useSelectSession } from "../../../context/SessionContext";
import { useToastify } from "../../../context/ToastContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";

import apiService from "../../../utilities/APIService";
import styles from "./OverlayCards.module.scss";

export const JoinSessionCard = () => {
  const { getModalState, toggleModal } = useModalContext();
  const { setLoader } = useLoader();
  const { setActiveSession, setActiveUser } = useSelectSession();
  const { setCurrentModel } = useUserDataModelContext();
  const { sendAlertToast } = useToastify();

  const sessionCodeRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (sessionCodeRef.current !== null) {
        setLoader(true);
        const response: any = await apiService.joinSession(
          sessionCodeRef.current.value
        );

        const userData = await apiService.getAllUserData();
        setLoader(false);
        setCurrentModel(userData);

        toggleModal({ modalType: getModalState().modalState.modalType });
        setActiveSession(response.sessionid);
        setActiveUser(response.userid);
      }
    } catch (error: any) {
      setLoader(false);
      sendAlertToast({ title: error.message });
    }
  };

  return (
    <>
      <form className={styles.card} onSubmit={confirmButtonHandler}>
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
