import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Oval } from "react-loader-spinner";
import { ActiveSessionContainer } from "../components/ActiveSessionContainer/ActiveSessionContainer";
import { Header } from "../components/Header/Header";
import { ModalOverlay } from "../components/ModalOverlay/ModalOverlay";
import { SessionBar } from "../components/SessionBar/SessionBar";
import { useLoader } from "../context/LoadingContext";
import { useModalContext } from "../context/ModalContext";
import { useSelectSession } from "../context/SessionContext";
import { useUserDataModelContext } from "../context/UserDataModelContext";
import useInterval from "../hooks/useInterval";
import apiService from "../utilities/APIService";
import styles from "./Home.module.scss";

export const Home = () => {
  const [usersBarVisible, setUsersBarVisible] = useState(false);

  const { setCurrentModel } = useUserDataModelContext();

  const { getModalState } = useModalContext();

  const { isLoaderEnabled, setLoader } = useLoader();

  const { getActiveSession } = useSelectSession();

  const fetchAllData = useCallback(async () => {
    try {
      const response = await apiService.getAllUserData();
      if (response !== null) {
        setLoader(false);
        setCurrentModel(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useInterval(() => {
    fetchAllData();
  }, 1000);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const setUsersBarVisibleHandler = (val: boolean) => {
    setUsersBarVisible(val);
  };

  const switchUsersBarVisibleHandler = () => {
    setUsersBarVisible((currentVal) => {
      return !currentVal;
    });
  };

  return (
    <>
      <Container className={styles.custom}>
        <div className={styles.wrapper}>
          {getModalState().modalVisible && <ModalOverlay />}
          <Header></Header>
          <div className={styles.overall}>
            <SessionBar
              setUsersBarVisible={switchUsersBarVisibleHandler}
              usersBarVisible={usersBarVisible}
            />
            {getActiveSession() && (
              <ActiveSessionContainer
                setUsersBarVisible={setUsersBarVisibleHandler}
                usersBarVisible={usersBarVisible}
              />
            )}
          </div>
        </div>
        {isLoaderEnabled() && (
          <div className={styles.backdrop}>
            <Oval
              height={80}
              width={80}
              color="#93A7E8"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#6baae8"
              strokeWidth={6}
              strokeWidthSecondary={6}
            />
          </div>
        )}
      </Container>
    </>
  );
};
