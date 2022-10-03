import { useSelectSession } from "../../../context/SessionContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";
import OutsideClickHandler from "react-outside-click-handler";
import apiService from "../../../utilities/APIService";
import styles from "./UserMenu.module.scss";
import { useLoader } from "../../../context/LoadingContext";

type UserMenuProps = {
  hideMenuHandler: () => void;
  userid: string;
};

export const UserMenu = (props: UserMenuProps) => {
  const { getCurrentModel } = useUserDataModelContext();
  const { setLoader } = useLoader();
  const { setActiveUser } = useSelectSession();
  const { setCurrentModel } = useUserDataModelContext();

  const isThisActiveUser = getCurrentModel().activeUser.id === props.userid;

  const { getActiveSession } = useSelectSession();

  const removeUserHandler = async () => {
    try {
      setLoader(true);
      const response = await apiService.removeUser(
        props.userid,
        getActiveSession()
      );
      isThisActiveUser && setActiveUser("");
      isThisActiveUser && console.log(response.message);

      const userData = await apiService.getAllUserData();
      if (userData !== null) {
        setLoader(false);
        setCurrentModel(userData);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => props.hideMenuHandler()}>
        <div className={styles.menu}>
          {isThisActiveUser ? (
            <button onClick={removeUserHandler}>Leave</button>
          ) : (
            <button onClick={removeUserHandler}>Remove</button>
          )}
        </div>
      </OutsideClickHandler>
    </>
  );
};
