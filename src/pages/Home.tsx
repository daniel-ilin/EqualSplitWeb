import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ActiveSessionContainer } from "../components/ActiveSessionContainer/ActiveSessionContainer";
import { Header } from "../components/Header/Header";
import { ModalOverlay } from "../components/ModalOverlay/ModalOverlay";
import { SessionBar } from "../components/SessionBar/SessionBar";
import { useModalContext } from "../context/ModalContext";
import { useUserDataModelContext } from "../context/UserDataModelContext";
import useInterval from "../hooks/useInterval";
import apiService from "../utilities/APIService";
import styles from "./Home.module.css";

export const Home = () => {
  const [usersBarVisible, setUsersBarVisible] = useState(false);

  const { setCurrentModel } = useUserDataModelContext();

  const { getModalState } = useModalContext();

  const fetchAllData = async () => {
    try {
      const response = await apiService.getAllUserData();
      if (response !== null) {
        setCurrentModel(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useInterval(() => {
    fetchAllData();
  }, 1000);

  useEffect(() => {
    fetchAllData();
  }, []);

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
            <div style={{ zIndex: 2 }}>
              <SessionBar
                setUsersBarVisible={switchUsersBarVisibleHandler}
                usersBarVisible={usersBarVisible}
              />
            </div>
            <ActiveSessionContainer
              setUsersBarVisible={setUsersBarVisibleHandler}
              usersBarVisible={usersBarVisible}
            />
          </div>
        </div>
        {/* <div className={styles.backdrop}></div> */}
      </Container>
    </>
  );
};
