import { useRef, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import apiService from "../../utilities/APIService";
import styles from "./LoginCard.module.scss";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoadingContext";
import logoPath from "../../imgs/equalsplit-logo.png";

export const LoginCard = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setLoginState } = useLoginContext();
  const { setLoader } = useLoader();

  const [errorShowing, setErrorShowing] = useState(false);

  const navigate = useNavigate();

  const confirmButtonHandler = async () => {
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
      } catch (error) {
        setErrorShowing(true);
      }
    }
  };

  return (
    <>
      <div className={styles.card}>
        <img src={logoPath} width={78} alt={"Logo"}></img>
        <span className={styles["v-group"]}>
          <h2>Welcome Back</h2>
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
        </span>
        <span className={styles["h-group"]}>
          <button className={styles.confirm} onClick={confirmButtonHandler}>
            Login
          </button>
        </span>
        <div className={styles.centerblock}>
          {errorShowing && (
            <p
              style={{
                color: "red",
                fontSize: "0.6rem",
                position: "fixed",
                marginTop: "-1.8rem",
              }}
            >
              Wrong email/password
            </p>
          )}
          <button className={styles.bottomText}>
            <p className={styles.secondary}>Forgot your password?</p>
            <p className={styles.main}>Reset password</p>
          </button>
        </div>
      </div>
    </>
  );
};
