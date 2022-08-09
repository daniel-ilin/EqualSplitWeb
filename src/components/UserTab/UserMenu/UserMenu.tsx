import { useSelectSession } from "../../../context/SessionContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";
import apiService from "../../../utilities/APIService";
import styles from "./UserMenu.module.css";

type UserMenuProps = {
  hideMenuHandler: () => void;
  userid: string;
};

export const UserMenu = (props: UserMenuProps) => {
  const { getCurrentModel } = useUserDataModelContext();

  const isThisActiveUser = getCurrentModel().activeUser.id === props.userid;

  const { getActiveSession } = useSelectSession();

  const removeUserHandler = async () => {
    try {
      const response = await apiService.removeUser(
        props.userid,
        getActiveSession()
      );
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ position: "relative", zIndex: "10" }}>
        <div className={styles.backdrop} onClick={props.hideMenuHandler} />
        <div className={styles.menu}>
          {isThisActiveUser ? (
            <button onClick={removeUserHandler}>Leave</button>
          ) : (
            <button onClick={removeUserHandler}>Remove</button>
          )}
        </div>
      </div>
    </>
  );
};
