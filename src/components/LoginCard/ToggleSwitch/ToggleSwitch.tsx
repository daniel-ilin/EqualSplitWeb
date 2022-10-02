import { useEffect, useState } from "react";
import styles from "./ToggleSwitch.module.scss";

type ToggleSwitchProps = {
  positionOffTitle: string;
  positionOnTitle: string;
  onSwitchHandler: (arg0: boolean) => void;
};

export const ToggleSwitch = (props: ToggleSwitchProps) => {
  const [positionOn, setPositionOn] = useState(false);

  const switchStyle = positionOn
    ? `${styles.switchSelector} ${styles.on}`
    : `${styles.switchSelector} ${styles.off}`;

  useEffect(() => {
    props.onSwitchHandler(positionOn);
  }, [positionOn, props]);

  const clickHandler = () => {
    setPositionOn((prev) => !prev);
  };

  const positionOffStyle = positionOn
    ? `${styles.titleContainer}`
    : `${styles.titleContainer} ${styles.enabled}`;

  const positionOnStyle = !positionOn
    ? `${styles.titleContainer}`
    : `${styles.titleContainer} ${styles.enabled}`;

  return (
    <>
      <button className={styles.container} onClick={clickHandler}>
        <span className={positionOffStyle}>
          <p className={styles.title}>{props.positionOffTitle}</p>
          <p className={`${styles.title} ${styles.bold}`}>
            {props.positionOffTitle}
          </p>
        </span>
        <span className={positionOnStyle}>
          <p className={styles.title}>{props.positionOnTitle}</p>
          <p className={`${styles.title} ${styles.bold}`}>
            {props.positionOnTitle}
          </p>
        </span>
        <div className={switchStyle} />
      </button>
    </>
  );
};
