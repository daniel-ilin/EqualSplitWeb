import { useRef } from "react";
import styles from "./LoginCard.module.css";

type LoginCardProps = {
  changeRegisterShowingHandler: () => void;
};

export const LoginCard = (props: LoginCardProps) => {
  const sessionNameRef = useRef<HTMLInputElement>(null);

  const confirmButtonHandler = () => {};

  return (
    <>
      <div className={styles.card}>
        <span className={styles["v-group"]}>
          <h2>EqualSplit</h2>
          <p>Login</p>
          <input
            placeholder="Email"
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
          <input
            placeholder="Password"
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
          <button>
            <h4>Forgot your password?</h4>
            <h3>Reset Password</h3>
          </button>
        </div>
      </div>
    </>
  );
};
