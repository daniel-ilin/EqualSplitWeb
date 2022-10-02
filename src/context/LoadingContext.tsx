import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type LoadingContextProviderProps = {
  children: ReactNode;
};

type LoadingContextType = {
  setLoader: (arg0: boolean) => void;
  isLoaderEnabled: () => boolean;
};

const LoadingContext = createContext({} as LoadingContextType);

export const useLoader = () => {
  return useContext(LoadingContext);
};

export const LoadingContextProvider = (props: LoadingContextProviderProps) => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let interval: any;
    if (loader) {
      interval = setInterval(() => {
        setLoader(false);
      }, 20000);
    }
    return () => clearInterval(interval);
  }, [loader]);

  const isLoaderEnabled = () => {
    return loader;
  };

  return (
    <LoadingContext.Provider value={{ isLoaderEnabled, setLoader }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
