import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.css";
import { SessionContextProvider } from "./context/SessionContext";
import LoadingSpinner from "./components/Spinner/LoadingSpinner";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { UserDataModelContextProvider } from "./context/UserDataModelContext";
import { ModalContextProvider } from "./context/ModalContext";

function App() {
  return (
    <>
      <ModalContextProvider>
        <SessionContextProvider>
          <UserDataModelContextProvider>
            <Suspense
              fallback={
                <div className={styles.centered}>
                  <LoadingSpinner />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/home" element={<Home />}></Route>
              </Routes>
            </Suspense>
          </UserDataModelContextProvider>
        </SessionContextProvider>
      </ModalContextProvider>
    </>
  );
}

export default App;
