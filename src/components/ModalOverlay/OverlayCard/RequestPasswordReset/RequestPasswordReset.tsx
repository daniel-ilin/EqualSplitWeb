import { useEffect, useRef, useState } from "react";
import { useLoader } from "../../../../context/LoadingContext";
import { useModalContext } from "../../../../context/ModalContext";
import { useSelectSession } from "../../../../context/SessionContext";
import { useToastify } from "../../../../context/ToastContext";
import { useUserDataModelContext } from "../../../../context/UserDataModelContext";

import apiService from "../../../../utilities/APIService";
import styles from ".././OverlayCards.module.scss";

export const RequestPasswordReset = () => {
  const { getModalState, toggleModal } = useModalContext();
  const [processingRequest, setProcessingRequest] = useState(false);
  //   const { setLoader } = useLoader();
  //   const { setActiveSession, setActiveUser } = useSelectSession();
  //   const { setCurrentModel } = useUserDataModelContext();

  const emailRef = useRef<HTMLInputElement>(null);
  const { sendAlertToast, sendInfoToast } = useToastify();
  const email = getModalState().modalState.email;

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setProcessingRequest(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [processingRequest]);

  const confirmButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setProcessingRequest(true);
    let sendEmail = email ? email : emailRef.current?.value;
    if (!sendEmail) return;
    try {
      await apiService.sendResetPasswordLink(sendEmail);
      toggleModal({ modalType: getModalState().modalState.modalType });
      sendInfoToast({
        title: "Sent the password reset link to " + sendEmail,
      });
    } catch (error: any) {
      sendAlertToast({
        title: error.message ?? "Could not send the password reset link",
      });
    }
  };

  return (
    <>
      <form className={styles.card} onSubmit={confirmButtonHandler}>
        <span className={styles["v-group"]}>
          <h2>Password reset</h2>
          <p>Enter your email for the reset link</p>
          <input
            defaultValue={email}
            placeholder="Email"
            ref={emailRef}
            onKeyPress={(event) => {
              if (
                emailRef.current?.value !== undefined &&
                emailRef.current?.value.length > 30
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

          <input
            type={"submit"}
            className={
              !processingRequest
                ? `${styles["confirm"]}`
                : `${styles["confirm"]} ${styles["disabled"]}`
            }
            disabled={processingRequest}
            value={"Confirm"}
          />
        </span>
      </form>
    </>
  );
};
