import { useState } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import { DotsButton } from ".././DotsButton/DotsButton";
import { DropDownMenu } from ".././DropDownMenu/DropDownMenu";
import { DropDownMenuMobile } from ".././DropDownMenu/DropDownMenuMobile";
import styles from "./Header.module.css";

export const Header = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);

  const menuExpandedHandler = () => {
    setMenuExpanded((menuExpanded) => {
      return !menuExpanded;
    });
  };

  return (
    <>
      <CSSTransition
        in={menuExpanded}
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={100}
        classNames={{
          enter: "",
          enterActive: styles["modal-open"],
          exit: "",
          exitActive: styles["modal-closed"],
        }}
      >
        <DropDownMenuMobile hideMenuHandler={menuExpandedHandler} />
      </CSSTransition>
      <div className={styles.header}>
        <DotsButton
          onMenuExpanded={menuExpandedHandler}
          menuExpanded={menuExpanded}
        />
        <DropDownMenu />
        <h4>EqualSplit</h4>
        <button className={styles["logout-button"]}>Log out</button>
      </div>
    </>
  );
};
