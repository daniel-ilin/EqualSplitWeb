import { useRef, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import apiService from "../../utilities/APIService";
import styles from "../LoginCard/LoginCard.module.scss";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoadingContext";
import logoPath from "../../imgs/equalsplit-logo.png";
import { useModalContext } from "../../context/ModalContext";
import { ModalType } from "../../types/ModalType";

export const RegisterCard = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const { setLoginState } = useLoginContext();
  const { setLoader } = useLoader();
  const { toggleModal } = useModalContext();
  const [errorShowing, setErrorShowing] = useState(false);

  const navigate = useNavigate();

  const confirmButtonHandler = async () => {
    if (
      emailRef.current?.value !== undefined &&
      passwordRef.current?.value !== undefined &&
      usernameRef.current?.value !== undefined
    ) {
      try {
        setLoader(true);
        await apiService.register(
          usernameRef.current?.value,
          emailRef.current?.value,
          passwordRef.current?.value
        );
        setErrorShowing(false);
      } catch (error) {
        setErrorShowing(true);
      }
    }
  };

  const getCodeHandler = () => {
    toggleModal({ modalType: ModalType.requestCode });
  };

  return (
    <>
      <div className={styles.card}>
        <img src={logoPath} width={78} alt={"Logo"}></img>
        <span className={styles["v-group"]}>
          <h2>Sign Up</h2>
          <input
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
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            onKeyPress={(event) => {
              if (
                passwordRef.current?.value !== undefined &&
                passwordRef.current?.value.length > 30
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
                passwordRef.current?.value.length > 30
              ) {
                event.preventDefault();
              }
            }}
          />
        </span>
        <span className={styles["h-group"]}>
          <button className={styles.confirm} onClick={confirmButtonHandler}>
            Sign Up
          </button>
        </span>
        <div className={styles.centerblock}>
          <button className={styles.bottomText} onClick={getCodeHandler}>
            <p className={styles.secondary}>Forgot your password?</p>
          </button>
        </div>
      </div>
    </>
  );
};
