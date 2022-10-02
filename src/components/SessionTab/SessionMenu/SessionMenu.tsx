import OutsideClickHandler from "react-outside-click-handler";
import { useLoader } from "../../../context/LoadingContext";
import { useModalContext } from "../../../context/ModalContext";
import { useSelectSession } from "../../../context/SessionContext";
import { useUserDataModelContext } from "../../../context/UserDataModelContext";
import { ModalType } from "../../../types/ModalType";
import apiService from "../../../utilities/APIService";
import styles from "./SessionMenu.module.scss";

type SessionMenuProps = {
  hideMenuHandler: () => void;
  session: Session;
};

export const SessionMenu = (props: SessionMenuProps) => {
  const { setLoader } = useLoader();
  const { getCurrentModel } = useUserDataModelContext();
  const { toggleModal } = useModalContext();
  const { setActiveUser } = useSelectSession();

  const isUserSessionOwner =
    props.session.ownerid === getCurrentModel().activeUser.id;

  const deleteSessionHandler = async () => {
    try {
      setLoader(true);
      const response = await apiService.deleteSession(props.session.id);
      setActiveUser("");
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveSession = async () => {
    try {
      setLoader(true);
      const response = await apiService.removeUser(
        getCurrentModel().activeUser.id,
        props.session.id
      );
      setActiveUser("");
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const menuStyle = `${styles.menu}`;

  return (
    <>
      <OutsideClickHandler onOutsideClick={props.hideMenuHandler}>
        <div className={menuStyle}>
          {isUserSessionOwner === true && (
            <button
              onClick={() => {
                props.hideMenuHandler();
                toggleModal({
                  modalType: ModalType.editSession,
                  session: props.session,
                });
              }}
            >
              Edit
            </button>
          )}

          {isUserSessionOwner === true && <div className={styles.divider} />}

          {isUserSessionOwner === true ? (
            <button
              onClick={() => {
                props.hideMenuHandler();
                deleteSessionHandler();
              }}
            >
              Delete
            </button>
          ) : (
            <button
              onClick={() => {
                props.hideMenuHandler();
                leaveSession();
              }}
            >
              Leave
            </button>
          )}
        </div>
      </OutsideClickHandler>
    </>
  );
};
