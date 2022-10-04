import { createContext, ReactNode, useContext } from "react";
import { toast, ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastContextProviderProps = {
  children: ReactNode;
};

interface SendToastContainerProps extends ToastContainerProps {
  title: string;
}

type ToastContextType = {
  sendInfoToast: (
    toastProps: SendToastContainerProps & React.RefAttributes<HTMLDivElement>
  ) => void;
  sendAlertToast: (
    toastProps: SendToastContainerProps & React.RefAttributes<HTMLDivElement>
  ) => void;
};

const ToastContext = createContext({} as ToastContextType);

export const useToastify = () => {
  return useContext(ToastContext);
};

export const ToastContextProvider = (props: ToastContextProviderProps) => {
  const sendInfoToast = (
    toastProps: SendToastContainerProps & React.RefAttributes<HTMLDivElement>
  ) => {
    toast.info(toastProps.title, {
      theme: "dark",
    });
  };

  const sendAlertToast = (
    toastProps: SendToastContainerProps & React.RefAttributes<HTMLDivElement>
  ) => {
    toast.error(toastProps.title, {
      theme: "dark",
    });
  };

  return (
    <ToastContext.Provider value={{ sendAlertToast, sendInfoToast }}>
      {props.children}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </ToastContext.Provider>
  );
};
