import React from "react";
import styles from "./PrimaryButton.module.scss";

type PrimaryButtonProps = {
  children?: React.ReactNode;
  onClickHandler: () => void;
};

export const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <>
      <button className={styles.primaryButton} onClick={props.onClickHandler}>
        {props.children}
      </button>
    </>
  );
};
