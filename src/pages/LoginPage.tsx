import { useState } from "react";
import { LoginCard } from "../components/LoginCard/LoginCard";
import { RegisterCard } from "../components/RegisterCard/RegisterCard";
import { ReactComponent as BacksplashVector } from "../imgs/back-vector.svg";
import appStorePath from "../imgs/appstore.svg";
import styles from "./LoginPage.module.scss";
import { ToggleSwitch } from "../components/LoginCard/ToggleSwitch/ToggleSwitch";

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
            <span>
              <h1>EqualSplit</h1>
              <p className={styles.subtitle}>Web Version</p>
              <p>
                Keep track of your group expenses and quickly sort them in the
                simplest way!
              </p>
            </span>
            <div className={styles.appStoreButton}>
              <a
                href={"https://apps.apple.com/us/app/equalsplit/id1596676542"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width={"120px"}
                  className={styles.appStoreLink}
                  src={appStorePath}
                  alt={"Appstore"}
                />
              </a>
            </div>
          </span>

          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                marginBottom: "20px",
              }}
            >
              <ToggleSwitch
                positionOffTitle={"login"}
                positionOnTitle={"signup"}
                onSwitchHandler={setRegisterShowing}
              />
            </span>
            {!registerShowing ? <LoginCard /> : <RegisterCard />}
          </span>
        </div>
        <span className={styles.vectorContainer}>
          <BacksplashVector width={"100%"} height={"100%"} />
        </span>
      </div>
    </>
  );
};
