import { useUserDataModelContext } from "../../../context/UserDataModelContext";
import apiService from "../../../utilities/APIService";
import styles from "./SessionMenu.module.css";

type SessionMenuProps = {
  hideMenuHandler: () => void;
  session: Session;
};

export const SessionMenu = (props: SessionMenuProps) => {
  const { getCurrentModel } = useUserDataModelContext();

  const isUserSessionOwner =
    props.session.ownerid === getCurrentModel().activeUser.id;

  const deleteSessionHandler = async () => {
    try {
      const response = await apiService.deleteSession(props.session.id);
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveSession = async () => {
    try {
      const response = await apiService.removeUser(
        getCurrentModel().activeUser.id,
        props.session.id
      );
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const menuStyle =
    isUserSessionOwner === true
      ? `${styles.menu}`
      : `${styles.menu} ${styles.singleline}`;

  return (
    <>
      <div style={{ position: "relative", zIndex: "10" }}>
        <div className={styles.backdrop} onClick={props.hideMenuHandler} />
        <div className={menuStyle}>
          {isUserSessionOwner === true && <button>Edit</button>}

          {isUserSessionOwner === true && <div className={styles.divider} />}

          {isUserSessionOwner === true ? (
            <button onClick={deleteSessionHandler}>Delete</button>
          ) : (
            <button onClick={leaveSession}>Leave</button>
          )}
        </div>
      </div>
    </>
  );
};
