import { useRef } from "react";
import { useLoader } from "../../../context/LoadingContext";
import { useModalContext } from "../../../context/ModalContext";
import { useSelectSession } from "../../../context/SessionContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";

import apiService from "../../../utilities/APIService";
import styles from "./OverlayCards.module.scss";

export const JoinSessionCard = () => {
  const { getModalState, toggleModal } = useModalContext();
  const { setLoader } = useLoader();
  const { setActiveSession, setActiveUser } = useSelectSession();
  const { setCurrentModel } = useUserDataModelContext();

  const sessionCodeRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async () => {
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
    } catch (error) {
      setLoader(false);
      console.log(error);
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
