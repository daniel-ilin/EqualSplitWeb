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
