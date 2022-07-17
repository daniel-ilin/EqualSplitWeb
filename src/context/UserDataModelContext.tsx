import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type SessionContextProviderProps = {
  children: ReactNode;
};

type UserDataModelContextType = {
  getCurrentModel: () => UserData;
  setCurrentModel: (userData: UserData) => void;
};

const UserDataModelContext = createContext({} as UserDataModelContextType);

export const useUserDataModelContext = () => {
  return useContext(UserDataModelContext);
};

export const UserDataModelContextProvider = (
  props: SessionContextProviderProps
) => {
  const [userData, setUserData] = useState({} as UserData);
  const userDataMemo = useMemo(() => userData, [userData]);

  const getCurrentModel = () => {
    return userDataMemo;
  };

  const setCurrentModel = (userData: UserData) => {    
    setUserData(userData);
  };
  

  return (
    <UserDataModelContext.Provider value={{ getCurrentModel, setCurrentModel }}>
      {props.children}
    </UserDataModelContext.Provider>
  );
};
