import styles from "./RegisterCard.module.scss";
import { useRef } from "react";
import apiService from "../../utilities/APIService";
import { useLoader } from "../../context/LoadingContext";

type RegisterCardProps = {
  changeRegisterShowingHandler: () => void;
};

export const RegisterCard = (props: RegisterCardProps) => {
  const { setLoader } = useLoader();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const confirmButtonHandler = async () => {
    if (
      nameRef.current?.value === undefined ||
      emailRef.current?.value === undefined ||
      passwordRef.current?.value === undefined
    ) {
      return;
    }
    try {
      setLoader(true);
      const response = await apiService.register(
        nameRef.current?.value,
        emailRef.current?.value,
        passwordRef.current?.value
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <span className={styles["v-group"]}>
          <h2>EqualSplit</h2>
          <p>Register</p>
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
            placeholder="Name"
            ref={nameRef}
            onKeyPress={(event) => {
              if (
                nameRef.current?.value !== undefined &&
                nameRef.current?.value.length > 30
              ) {
                event.preventDefault();
              }
            }}
          />
          <input
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
            Login
          </button>
          <button className={styles.confirm} onClick={confirmButtonHandler}>
            Register
          </button>
        </span>
        <div className={styles.centerblock}>
          <button>
            <h4>Forgot your password?</h4>
            <h3>Reset password</h3>
          </button>
        </div>
      </div>
    </>
  );
};
