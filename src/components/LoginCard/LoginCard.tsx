import { useRef, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import apiService from "../../utilities/APIService";
import styles from "./LoginCard.module.css";
import { useNavigate } from "react-router-dom";

type LoginCardProps = {
  changeRegisterShowingHandler: () => void;
};

export const LoginCard = (props: LoginCardProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setLoginState } = useLoginContext();

  const [errorShowing, setErrorShowing] = useState(false);

  const navigate = useNavigate();

  const confirmButtonHandler = async () => {
    if (
      emailRef.current?.value !== undefined &&
      passwordRef.current?.value !== undefined
    ) {
      try {
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
        <span className={styles["v-group"]}>
          <h2>EqualSplit</h2>
          <p>Login</p>
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
          <button
            className={styles.cancel}
            onClick={props.changeRegisterShowingHandler}
          >
            Register
          </button>
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
          <button>
            <h4>Forgot your password?</h4>
            <h3>Reset password</h3>
          </button>
        </div>
      </div>
    </>
  );
};
