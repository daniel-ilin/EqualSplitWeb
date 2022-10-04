import { useRef } from "react";
import { useLoader } from "../../../../context/LoadingContext";
import { useModalContext } from "../../../../context/ModalContext";
import { useSelectSession } from "../../../../context/SessionContext";
import { useUserDataModelContext } from "../../../../context/UserDataModelContext";

import apiService from "../../../../utilities/APIService";
import styles from ".././OverlayCards.module.scss";

export const EnterActivationCode = () => {
  const { getModalState, toggleModal } = useModalContext();
  //   const { setLoader } = useLoader();
  //   const { setActiveSession, setActiveUser } = useSelectSession();
  //   const { setCurrentModel } = useUserDataModelContext();

  const sessionNameRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const confirmButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <form className={styles.card} onSubmit={confirmButtonHandler}>
        <span className={styles["v-group"]}>
          <h2>Enter your activation code</h2>
          <p>Check your email for the code</p>
          <input
            placeholder="••••••"
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
