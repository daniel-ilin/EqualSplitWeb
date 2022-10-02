import { useState } from "react";
import { LoginCard } from "../components/LoginCard/LoginCard";
import { RegisterCard } from "../components/RegisterCard/RegisterCard";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const [registerShowing, setRegisterShowing] = useState(false);

  const changeRegisterShowingHandler = () => {
    setRegisterShowing((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <div className={styles.overall}>
        <div>
          <h1>EqualSplit</h1>
          <p>
            Welcome to EqualSplit! I made this app to bookkeep and quickly sort
            your finances with your friends. Whether it is long-term
          </p>
        </div>
        {!registerShowing ? (
          <LoginCard
            changeRegisterShowingHandler={changeRegisterShowingHandler}
          />
        ) : (
          <RegisterCard
            changeRegisterShowingHandler={changeRegisterShowingHandler}
          />
        )}
      </div>
    </>
  );
};
