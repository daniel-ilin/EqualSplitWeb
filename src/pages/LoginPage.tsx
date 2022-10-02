import { useState } from "react";
import { LoginCard } from "../components/LoginCard/LoginCard";
import { RegisterCard } from "../components/RegisterCard/RegisterCard";
import { ReactComponent as BacksplashVector } from "../imgs/back-vector.svg";
import styles from "./LoginPage.module.scss";

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
        <div className={styles.hContainer}>
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
        <span className={styles.vectorContainer}>
          <BacksplashVector width={"100%"} height={"100%"} />
        </span>
      </div>
    </>
  );
};
