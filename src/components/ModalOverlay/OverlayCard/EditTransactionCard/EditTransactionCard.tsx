import { useRef, useState } from "react";
import { useLoader } from "../../../../context/LoadingContext";
import { useModalContext } from "../../../../context/ModalContext";
import apiService from "../../../../utilities/APIService";
import { CurrencyInputField } from "../../../CurrencyInputField/CurrencyInputField";
import styles from "../OverlayCards.module.scss";

export const EditTransactionCard = () => {
  const { toggleModal, getModalState } = useModalContext();
  const [moneyAmount, setMoneyAmount] = useState(0);
  const { setLoader } = useLoader();
  const descriptionRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const updateAmountHandler = (amount: number) => {
    setMoneyAmount(amount);
  };

  const confirmButtonHandler = async () => {
    try {
      let id = getModalState().modalState.transaction?.id;
      if (
        descriptionRef.current !== null &&
        descriptionRef.current.value.length > 0 &&
        id
      ) {
        setLoader(true);
        const response = await apiService.changeTransaction(
          id,
          moneyAmount,
          descriptionRef.current.value
        );

        toggleModal({ modalType: getModalState().modalState.modalType });
        if (response.error !== undefined) {
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <span className={styles["v-group"]}>
          <h2>Edit transaction</h2>
          <p>Enter transaction data</p>
          <span style={{ width: "100%" }}>
            <CurrencyInputField
              updateAmount={updateAmountHandler}
              moneyAmount={moneyAmount}
            />
          </span>
          <div style={{ width: "100%", height: "10px" }} />
          <input
            placeholder="Description"
            ref={descriptionRef}
            onKeyPress={(event) => {
              if (
                descriptionRef.current?.value !== undefined &&
                descriptionRef.current?.value.length >= 100
              ) {
                event.preventDefault();
              }
            }}
          />
        </span>
        <span className={styles["h-group"]}>
          <button className={styles.cancel} onClick={cancelButtonHandler}>
            Cancel
          </button>
          <button className={styles.confirm} onClick={confirmButtonHandler}>
            Confirm
          </button>
        </span>
      </div>
    </>
  );
};
