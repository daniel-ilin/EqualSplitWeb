import { useRef, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import apiService from "../../utilities/APIService";
import styles from "./LoginCard.module.scss";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoadingContext";
import logoPath from "../../imgs/equalsplit-logo.png";
import { useUserDataModelContext } from "../../context/UserDataModelContext";
import axios from "axios";
import { useModalContext } from "../../context/ModalContext";
import { ModalType } from "../../types/ModalType";

export const LoginCard = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setCurrentModel } = useUserDataModelContext();

  const { setLoginState } = useLoginContext();
  const { setLoader } = useLoader();
  const { toggleModal } = useModalContext();

  const [errorShowing, setErrorShowing] = useState(false);

  const navigate = useNavigate();

  const confirmButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (
      emailRef.current?.value !== undefined &&
      passwordRef.current?.value !== undefined
    ) {
      try {
        setLoader(true);
        await apiService.login(
          emailRef.current?.value,
          passwordRef.current?.value
        );

        setErrorShowing(false);
        setLoginState(true);
        navigate("/home");

        const userData = await apiService.getAllUserData();
        setLoader(false);
        setCurrentModel(userData);
      } catch (error: any) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 403
        ) {
          toggleModal({
            modalType: ModalType.activateCode,
            email: emailRef.current.value,
          });
        } else {
          setErrorShowing(true);
        }
        setLoader(false);
      }
    }
  };

  const getCodeHandler = () => {
    toggleModal({ modalType: ModalType.requestReset });
  };

  return (
    <>
      <form className={styles.card} onSubmit={confirmButtonHandler}>
        <img src={logoPath} width={78} alt={"Logo"}></img>
        <span className={styles["v-group"]}>
          <h2>Welcome Back</h2>
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
        </span>
        {errorShowing && (
          <p
            style={{
              color: "#ffa7a2",
              fontSize: "11px",
              position: "relative",
              height: "0px",
              margin: "0",
              bottom: "12px",
              padding: "0",
            }}
          >
            Wrong email/password
          </p>
        )}
        <span className={styles["h-group"]}>
          <input
            type={"submit"}
            className={styles.confirm}
            value={"Login"}
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
