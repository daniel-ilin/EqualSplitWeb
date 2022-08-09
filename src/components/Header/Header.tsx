import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CSSTransition from "react-transition-group/CSSTransition";
import { useLoginContext } from "../../context/LoginContext";
import apiService from "../../utilities/APIService";
import { DotsButton } from ".././DotsButton/DotsButton";
import { DropDownMenu } from ".././DropDownMenu/DropDownMenu";
import { DropDownMenuMobile } from ".././DropDownMenu/DropDownMenuMobile";
import styles from "./Header.module.css";

export const Header = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);

  const navigate = useNavigate();

  const { setLoginState } = useLoginContext();

  const menuExpandedHandler = () => {
    setMenuExpanded((menuExpanded) => {
      return !menuExpanded;
    });
  };

  const logoutHandler = async () => {
    try {
      await apiService.logout();
      setLoginState(false);
      navigate("/login");
    } catch {
      console.log("Something went wrong with logout");
    }
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
        <button className={styles["logout-button"]} onClick={logoutHandler}>
          Log out
        </button>
      </div>
    </>
  );
};
