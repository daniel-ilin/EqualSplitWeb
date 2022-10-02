import { useModalContext } from "../../../context/ModalContext";
import { ModalType } from "../../../types/ModalType";
import styles from "./TransactionMenu.module.scss";

type TransactionMenuProps = {
  hideMenuHandler: () => void;
  deleteTransactionHandler: () => void;
  transaction: Transaction;
};

export const TransactionMenu = (props: TransactionMenuProps) => {
  const { toggleModal } = useModalContext();

  const editClickHandler = () => {
    props.hideMenuHandler();
    toggleModal({
      modalType: ModalType.editTransaction,
      transaction: props.transaction,
    });
  };

  return (
    <>
      <div className={styles.backdrop} onClick={props.hideMenuHandler} />
      <div className={styles.menu}>
        <button onClick={editClickHandler}>Edit</button>

        <div className={styles.divider} />

        <button
          onClick={() => {
            props.hideMenuHandler();
            props.deleteTransactionHandler();
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};
