import { Suspense, useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import { SessionContextProvider } from "./context/SessionContext";
import LoadingSpinner from "./components/Spinner/LoadingSpinner";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { UserDataModelContextProvider } from "./context/UserDataModelContext";
import { ModalContextProvider } from "./context/ModalContext";
import { useLoginContext } from "./context/LoginContext";
import Cookies from "js-cookie";
import apiService from "./utilities/APIService";

function App() {
  const { getLoginState, setLoginState } = useLoginContext();

  const navigate = useNavigate();

  const checkLoginState = useCallback(async () => {
    if (!Cookies.get("refresh-token")) {
      setLoginState(false);
      navigate("/login");
    } else {
      try {
        await apiService.getAccessToken();
        setLoginState(true);
        navigate("/home");
      } catch {
        try {
          apiService.logout();
          setLoginState(false);
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [navigate, setLoginState]);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

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
                {getLoginState() === false && (
                  <Route path="/" element={<Navigate to="/login" />} />
                )}
                {getLoginState() === true && (
                  <Route path="/" element={<Navigate to="/home" />} />
                )}
                {getLoginState() === false && (
                  <Route path="/login" element={<LoginPage />}></Route>
                )}
                {getLoginState() === true && (
                  <Route path="/home" element={<Home />}></Route>
                )}
              </Routes>
            </Suspense>
          </UserDataModelContextProvider>
        </SessionContextProvider>
      </ModalContextProvider>
    </>
  );
}

export default App;
