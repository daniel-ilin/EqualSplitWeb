import { useEffect, useRef, useState } from "react";
import { useModalContext } from "../../../../context/ModalContext";
import { useToastify } from "../../../../context/ToastContext";

import apiService from "../../../../utilities/APIService";
import styles from ".././OverlayCards.module.scss";

export const EnterActivationCode = () => {
  const { getModalState, toggleModal } = useModalContext();
  const [allowRequest, setAllowRequest] = useState(true);
  const [allowSubmit, setAllowSubmit] = useState(false);

  const { sendAlertToast, sendInfoToast } = useToastify();

  const codeRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const email = getModalState().modalState.email;
      if (email && codeRef.current?.value) {
        await apiService.activateUser(codeRef.current?.value, email);
        toggleModal({ modalType: getModalState().modalState.modalType });
        sendInfoToast({
          title: "Succesfully activated the user, try logging in!",
        });
      } else {
        sendAlertToast({
          title: "An error occured",
        });
      }
    } catch (error: any) {
      sendAlertToast({
        title: "Could not activate user",
      });
    }
  };

  const requestCodeHandler = async () => {
    try {
      if (allowRequest) {
        const email = getModalState().modalState.email;
        setAllowRequest(false);
        if (email) {
          await apiService.requestActivationCode(email);
        } else {
          sendAlertToast({
            title: "An error occured",
          });
        }
      } else {
        sendAlertToast({
          title: "Please wait some time until you can request the code again",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!allowRequest) {
      const interval = setInterval(() => {
        setAllowRequest(true);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [allowRequest]);

  useEffect(() => {
    requestCodeHandler();
  }, []);

  return (
    <>
      <form className={styles.card} onSubmit={confirmButtonHandler}>
        <span className={styles["v-group"]}>
          <h2>Enter your activation code</h2>
          <p>Check your email for the code</p>
          <input
            placeholder="••••••"
            ref={codeRef}
            onKeyPress={(event) => {
              if (
                codeRef.current?.value !== undefined &&
                codeRef.current?.value.length > 5
              ) {
                event.preventDefault();
              }
            }}
            onChange={(event) => {
              if (event.target.value.length >= 6) {
                setAllowSubmit(true);
              } else {
                setAllowSubmit(false);
              }
            }}
          />
        </span>
        <span className={styles["h-group"]}>
          <button
            type="button"
            className={styles.cancel}
            onClick={cancelButtonHandler}
          >
            Cancel
          </button>

          <input
            type={"submit"}
            className={
              allowSubmit
                ? styles.confirm
                : `${styles["confirm"]} ${styles["disabled"]}`
            }
            disabled={!allowSubmit}
            value={"Confirm"}
          />
        </span>
        <span className={styles["v-group"]}>
          <button
            type="button"
            className={
              allowRequest
                ? styles.secondary
                : `${styles["secondary"]} ${styles["disabled"]}`
            }
            onClick={requestCodeHandler}
          >
            {allowRequest ? "Resend code" : "Code sent"}
          </button>
        </span>
      </form>
    </>
  );
};
