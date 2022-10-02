import React from "react";
import styles from "./SecondaryButton.module.scss";

type SecondaryButtonProps = {
  children?: React.ReactNode;
  onClickHandler: () => void;
};

export const SecondaryButton = (props: SecondaryButtonProps) => {
  return (
    <>
      <button className={styles.secondaryButton} onClick={props.onClickHandler}>
        {props.children}
      </button>
    </>
  );
};
