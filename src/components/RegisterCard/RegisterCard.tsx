import { ChangeEvent, useRef, useState } from "react";
import apiService from "../../utilities/APIService";
import styles from "../LoginCard/LoginCard.module.scss";
import { useLoader } from "../../context/LoadingContext";
import logoPath from "../../imgs/equalsplit-logo.png";
import { useModalContext } from "../../context/ModalContext";
import { ModalType } from "../../types/ModalType";
import { useToastify } from "../../context/ToastContext";

export const RegisterCard = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [emailValid, setEmailValid] = useState(false);

  const { sendAlertToast } = useToastify();
  const { setLoader } = useLoader();
  const { toggleModal } = useModalContext();

  const confirmButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!emailValid) {
      sendAlertToast({
        title: "Incorrect email format",
      });
      return;
    }
    if (
      emailRef.current?.value &&
      passwordRef.current?.value &&
      usernameRef.current?.value
    ) {
      try {
        setLoader(true);
        await apiService.register(
          usernameRef.current?.value,
          emailRef.current?.value,
          passwordRef.current?.value
        );
        toggleModal({
          modalType: ModalType.activateCode,
          email: emailRef.current.value,
        });
      } catch (error: any) {
        sendAlertToast({
          title: `${error.message} Perhaps this email is taken` ?? "Error",
        });
      }
    } else {
      sendAlertToast({
        title: "Please fill out the form",
      });
    }
  };

  const getCodeHandler = () => {
    toggleModal({ modalType: ModalType.requestReset });
  };

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isValidEmail(event.target.value)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  return (
    <>
      <form className={styles.card} onSubmit={confirmButtonHandler}>
        <img src={logoPath} width={78} alt={"Logo"}></img>
        <span className={styles["v-group"]}>
          <h2>Sign Up</h2>
          <input
            placeholder="Email"
            ref={emailRef}
            onKeyPress={(event) => {
              if (
                emailRef.current?.value !== undefined &&
                emailRef.current?.value.length >= 255
              ) {
                event.preventDefault();
              }
            }}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            onKeyPress={(event) => {
              if (
                passwordRef.current?.value !== undefined &&
                passwordRef.current?.value.length >= 255
              ) {
                event.preventDefault();
              }
            }}
          />
          <input
            type="text"
            placeholder="Username"
            ref={usernameRef}
            onKeyPress={(event) => {
              if (
                passwordRef.current?.value !== undefined &&
                passwordRef.current?.value.length >= 255
              ) {
                event.preventDefault();
              }
            }}
          />
        </span>
        <span className={styles["h-group"]}>
          <input
            type={"submit"}
            className={styles.confirm}
            value={"Sign Up"}
          ></input>
        </span>
        <div className={styles.centerblock}>
          <button
            type="button"
            className={styles.bottomText}
            onClick={getCodeHandler}
          >
            <p className={styles.secondary}>Forgot your password?</p>
          </button>
        </div>
      </form>
    </>
  );
};
