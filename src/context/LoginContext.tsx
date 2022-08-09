import { createContext, ReactElement, useContext, useState } from "react";

type LoginContextType = {
  getLoginState: () => boolean;
  setLoginState: (arg0: boolean) => void;
};

type LoginContextProviderProps = {
  children: ReactElement;
};

const LoginContext = createContext({} as LoginContextType);

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export const LoginContextProvider = (props: LoginContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getLoginState = () => {
    return isLoggedIn;
  };

  const setLoginState = (newVal: boolean) => {
    setIsLoggedIn(newVal);
  };

  return (
    <>
      <LoginContext.Provider value={{ getLoginState, setLoginState }}>
        {props.children}
      </LoginContext.Provider>
    </>
  );
};
