import { useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { SessionContextProvider } from "./context/SessionContext";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { UserDataModelContextProvider } from "./context/UserDataModelContext";
import { ModalContextProvider } from "./context/ModalContext";
import { useLoginContext } from "./context/LoginContext";
import Cookies from "js-cookie";
import apiService from "./utilities/APIService";
import { LoadingContextProvider } from "./context/LoadingContext";
import { ToastContextProvider } from "./context/ToastContext";

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
            <LoadingContextProvider>
              <ToastContextProvider>
                <Routes>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/" element={<LoginPage />}></Route>
                  <Route
                    path="/*"
                    element={
                      !getLoginState() ? (
                        <Navigate to="/login" />
                      ) : (
                        <Navigate to="/home" />
                      )
                    }
                  />
                </Routes>
              </ToastContextProvider>
            </LoadingContextProvider>
          </UserDataModelContextProvider>
        </SessionContextProvider>
      </ModalContextProvider>
    </>
  );
}

export default App;
