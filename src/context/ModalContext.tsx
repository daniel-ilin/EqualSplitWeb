import {
  createContext,
  ReactElement,
  useContext,
  useReducer,
  useState,
} from "react";
import { ModalType } from "../types/ModalType";
import { modalReducer } from "./helpers/modalReducer";

type ModalReducerType = {
  modalType: ModalType | null;
};

type ModalContextType = {
  getModalState: () => { modalVisible: boolean; modalState: ModalReducerType };
  toggleModal: (arg0: ModalType | null) => void;
};

type ModalContextProvideProps = {
  children: ReactElement;
};

const ModalContext = createContext({} as ModalContextType);

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalContextProvider = (props: ModalContextProvideProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [modalState, dispatch] = useReducer(modalReducer, {
    modalType: null,
  });

  const getModalState = () => {
    return { modalVisible, modalState };
  };

  const toggleModal = (type: ModalType | null) => {
    setModalVisible((prev) => {
      if (!prev === true && type !== null) {
        dispatch({ type: type });
      }
      return !prev;
    });
  };

  return (
    <>
      <ModalContext.Provider value={{ getModalState, toggleModal }}>
        {props.children}
      </ModalContext.Provider>
    </>
  );
};
