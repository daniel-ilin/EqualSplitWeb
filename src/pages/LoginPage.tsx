import { useState } from "react";
import { LoginCard } from "../components/LoginCard/LoginCard";
import { RegisterCard } from "../components/RegisterCard/RegisterCard";
import { ReactComponent as BacksplashVector } from "../imgs/back-vector.svg";
import appStorePath from "../imgs/appstore.svg";
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
          <span className={styles.vContainer}>
            <h1>EqualSplit</h1>
            <p className={styles.subtitle}>Web Version</p>
            <p>
              Keep track of your friend group expenses and
              quickly sort them in the simplest way!
            </p>
          </span>

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
        <img
          width={"120px"}
          className={styles.appStoreLink}
          src={appStorePath}
          alt={"Appstore"}
        />
      </div>
    </>
  );
};
