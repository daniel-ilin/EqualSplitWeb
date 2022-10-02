import { ModalType } from "../../types/ModalType";

type ModalReducerType = {
  modalType: ModalType | null;
  session?: Session;
  transaction?: Transaction;
};

type Action = {
  type: ModalType;
  session?: Session;
  transaction?: Transaction;
};

export const modalReducer = (state: ModalReducerType, action: Action) => {
  switch (action.type) {
    case ModalType.createSession:
      state.modalType = ModalType.createSession;
      return state;
    case ModalType.joinSession:
      state.modalType = ModalType.joinSession;
      return state;
    case ModalType.profile:
      state.modalType = ModalType.profile;
      return state;
    case ModalType.editTransaction:
      state.modalType = ModalType.editTransaction;
      state.transaction = action.transaction;
      return state;
    case ModalType.editSession:
      state.modalType = ModalType.editSession;
      state.session = action.session;
      return state;
  }
};
