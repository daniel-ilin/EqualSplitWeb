import { useRef, useState } from "react";
import { useLoader } from "../../context/LoadingContext";
import { useSelectSession } from "../../context/SessionContext";
import { useUserDataModelContext } from "../../context/UserDataModelContext";
import apiService from "../../utilities/APIService";
import { CurrencyInputField } from "../CurrencyInputField/CurrencyInputField";

import styles from "./MessageInput.module.scss";

export const MessageInput = () => {
  const { setLoader } = useLoader();
  const { getActiveSession, getActiveUser } = useSelectSession();
  const { setCurrentModel } = useUserDataModelContext();

  const descriptionRef = useRef<HTMLInputElement>(null);
  const [moneyAmount, setMoneyAmount] = useState(0);

  const updateAmountHandler = (amount: number) => {
    setMoneyAmount(amount);
  };

  const addTransactionHandler = async () => {
    const sessionid = getActiveSession();
    const description =
      descriptionRef.current?.value === undefined
        ? ""
        : descriptionRef.current?.value;
    const money = moneyAmount;
    const activeUser = getActiveUser();
    try {
      setLoader(true);
      await apiService.addTransaction(
        sessionid,
        description,
        money,
        activeUser
      );

      const userData = await apiService.getAllUserData();
      setLoader(false);
      setCurrentModel(userData);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!descriptionRef.current) return;
    addTransactionHandler();
    descriptionRef.current.value = "";
    setMoneyAmount(0);
  };

  return (
    <>
      <div className={styles["whole-form"]}>
        <form onSubmit={submitHandler}>
          <span style={{ width: "40%" }}>
            <CurrencyInputField
              updateAmount={updateAmountHandler}
              moneyAmount={moneyAmount}
            />
          </span>
          <input
            ref={descriptionRef}
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            className={styles["description"]}
            onKeyPress={(event) => {
              if (
                descriptionRef.current !== null &&
                descriptionRef.current?.value.length > 100
              ) {
                event.preventDefault();
              }
            }}
          ></input>
          <input
            type="submit"
            value="Add"
            className={styles["add-button"]}
          ></input>
        </form>
      </div>
    </>
  );
};
