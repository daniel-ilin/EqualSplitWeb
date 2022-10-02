import { useRef } from "react";
import { useLoader } from "../../../context/LoadingContext";
import { useModalContext } from "../../../context/ModalContext";

import apiService from "../../../utilities/APIService";
import styles from "./OverlayCards.module.scss";

export const JoinSessionCard = () => {
  const { getModalState, toggleModal } = useModalContext();
  const { setLoader } = useLoader();

  const sessionCodeRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async () => {
    try {
      if (sessionCodeRef.current !== null) {
        setLoader(true);
        const response = await apiService.joinSession(
          sessionCodeRef.current.value
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
