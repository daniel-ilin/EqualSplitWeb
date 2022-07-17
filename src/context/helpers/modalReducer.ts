import { ModalType } from "../../types/ModalType";

type ModalReducerType = {
  modalType: ModalType | null;
};

type Action = {
  type: ModalType;
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
  }
};
