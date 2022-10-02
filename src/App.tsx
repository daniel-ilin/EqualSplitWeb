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
            </LoadingContextProvider>
          </UserDataModelContextProvider>
        </SessionContextProvider>
      </ModalContextProvider>
    </>
  );
}

export default App;
