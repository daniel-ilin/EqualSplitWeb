import { useRef, useState } from "react";
import { useLoader } from "../../../../context/LoadingContext";
import { useModalContext } from "../../../../context/ModalContext";
import { useUserDataModelContext } from "../../../../context/UserDataModelContext";
import apiService from "../../../../utilities/APIService";
import { CurrencyInputField } from "../../../CurrencyInputField/CurrencyInputField";
import styles from "../OverlayCards.module.scss";

export const EditTransactionCard = () => {
  const { toggleModal, getModalState } = useModalContext();
  const [moneyAmount, setMoneyAmount] = useState(0);
  const { setLoader } = useLoader();
  const { setCurrentModel } = useUserDataModelContext();
  const descriptionRef = useRef<HTMLInputElement>(null);

  const cancelButtonHandler = () => {
    toggleModal({ modalType: getModalState().modalState.modalType });
  };

  const updateAmountHandler = (amount: number) => {
    setMoneyAmount(amount);
  };

  const confirmButtonHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
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

        const userData = await apiService.getAllUserData();
        setLoader(false);
        setCurrentModel(userData);

        toggleModal({ modalType: getModalState().modalState.modalType });
        if (response.error !== undefined) {
          return;
        }
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <>
      <form className={styles.card} onSubmit={confirmButtonHandler}>
        <span className={styles["v-group"]}>
          <h2>Edit transaction</h2>
          <p>Enter transaction data</p>
          <span style={{ width: "100%" }}>
            <CurrencyInputField
              updateAmount={updateAmountHandler}
              moneyAmount={moneyAmount}
              defaultValue={
                +(getModalState().modalState.transaction?.amount ?? 0)
              }
            />
          </span>
          <div style={{ width: "100%", height: "10px" }} />
          <input
            placeholder="Description"
            ref={descriptionRef}
            defaultValue={getModalState().modalState.transaction?.description}
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
          <input
            type="button"
            value="Cancel"
            className={styles.cancel}
            onClick={cancelButtonHandler}
          />

          <input type={"submit"} className={styles.confirm} value={"Confirm"} />
        </span>
      </form>
    </>
  );
};
