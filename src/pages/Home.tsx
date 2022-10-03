import { useCallback, useEffect } from "react";
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
import { ReactComponent as BacksplashVector } from "../imgs/back-vector.svg";
import useInterval from "../hooks/useInterval";
import apiService from "../utilities/APIService";
import styles from "./Home.module.scss";
import { PrimaryButton } from "../components/Buttons/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "../components/Buttons/SecondaryButton/SecondaryButton";
import { ModalType } from "../types/ModalType";

export const Home = () => {
  const { getCurrentModel, setCurrentModel } = useUserDataModelContext();

  const { getActiveSession } = useSelectSession();

  const { getModalState, toggleModal } = useModalContext();

  const { isLoaderEnabled } = useLoader();

  const fetchAllData = useCallback(async () => {
    try {
      const response = await apiService.getAllUserData();
      if (response !== null) {
        setCurrentModel(response);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    fetchAllData();
  }, 10000);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const sessionsExist =
    getCurrentModel().sessions && getCurrentModel().sessions.length > 0;

  const joinSessionHandler = () => {
    toggleModal({ modalType: ModalType.joinSession });
  };

  const createSessionHandler = () => {
    toggleModal({ modalType: ModalType.createSession });
  };

  return (
    <>
      <Container className={styles.custom}>
        <div className={styles.wrapper}>
          {getModalState().modalVisible && <ModalOverlay />}
          <Header></Header>
          <div className={styles.overall}>
            {sessionsExist && <SessionBar />}
            {sessionsExist && getActiveSession() && <ActiveSessionContainer />}
            {!sessionsExist && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <PrimaryButton onClickHandler={createSessionHandler}>
                    Create Session
                  </PrimaryButton>
                  <p className={styles.orText}>or</p>
                  <SecondaryButton onClickHandler={joinSessionHandler}>
                    Join Session
                  </SecondaryButton>
                </span>
              </div>
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
        <span className={styles.vectorContainer}>
          <BacksplashVector width={"100%"} height={"100%"} />
        </span>
      </Container>
    </>
  );
};
