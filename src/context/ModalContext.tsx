import {
  createContext,
  ReactElement,
  useContext,
  useReducer,
  useState,
} from "react";
import { ModalType } from "../types/ModalType";
import { modalReducer } from "./helpers/modalReducer";

interface UseModalArgs {
  modalType: ModalType | null;
  session?: Session;
  transaction?: Transaction;
  email?: string;
}

type ModalReducerType = {
  modalType: ModalType | null;
  session?: Session;
  transaction?: Transaction;
  email?: string;
};

type ModalContextType = {
  getModalState: () => { modalVisible: boolean; modalState: ModalReducerType };
  toggleModal: (arg0: UseModalArgs | null) => void;
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

  const toggleModal = (payload: UseModalArgs | null) => {
    setModalVisible((prev) => {
      if (!prev === true && payload && payload?.modalType !== null) {
        dispatch({
          type: payload.modalType,
          session: payload.session,
          transaction: payload.transaction,
          email: payload.email,
        });
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
