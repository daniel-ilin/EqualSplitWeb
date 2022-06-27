import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SessionContextProviderProps = {
  children: ReactNode;
};

type SessionContext = {
  setActiveSession: (id: string) => void;
  setActiveUser: (id: string) => void;
  getActiveSession: () => string;
  getActiveUser: () => string;
  removeActiveUser: () => void;
};

const SessionContext = createContext({} as SessionContext);

export const useSelectSession = () => {
  return useContext(SessionContext);
};

export const SessionContextProvider = (props: SessionContextProviderProps) => {
  const [selectedSession, setSelectedSession] = useLocalStorage<string>(
    "selectedSession",
    ""
  );
  const [selectedUser, setSelectedUser] = useLocalStorage<string>(
    "selectedUser",
    ""
  );

  const setActiveSession = (id: string) => {
    console.log("Set active session");
    setSelectedSession(id);
  };

  const setActiveUser = (id: string) => {
    console.log("Set active user");
    setSelectedUser(id);
  };

  const getActiveSession = () => {
    return selectedSession;
  };
  const getActiveUser = () => {
    return selectedUser;
  };

  const removeActiveUser = () => {
    setSelectedUser("");
  };

  return (
    <SessionContext.Provider
      value={{
        setActiveSession,
        setActiveUser,
        getActiveSession,
        getActiveUser,
        removeActiveUser,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};
