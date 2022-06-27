import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SessionBar } from "./components/SessionBar";
import styles from "./App.module.css";
import { SessionContextProvider } from "./context/SessionContext";
import { Header } from "./components/Header";
import { ActiveSessionContainer } from "./components/ActiveSessionContainer/ActiveSessionContainer";

function App() {
  const [usersBarVisible, setUsersBarVisible] = useState(false);

  const setUsersBarVisibleHandler = (val: boolean) => {
    setUsersBarVisible(val)
  };

  const switchUsersBarVisibleHandler = () => {
    setUsersBarVisible((currentVal) => {
      console.log(JSON.stringify(!currentVal));
      return !currentVal;
    });
  };

  return (
    <>
      <SessionContextProvider>
        <Container className={styles.custom}>
          <div className={styles.wrapper}>
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
        </Container>
      </SessionContextProvider>
    </>
  );
}

export default App;
