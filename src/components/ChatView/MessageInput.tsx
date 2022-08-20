import { useEffect, useRef, useState } from "react";
import { useSelectSession } from "../../context/SessionContext";
import { useUserDataModelContext } from "../../context/UserDataModelContext";
import useHttp from "../../hooks/use-http";
import apiService from "../../utilities/APIService";
import { CurrencyInputField } from "../CurrencyInputField/CurrencyInputField";

import styles from "./MessageInput.module.css";

export const MessageInput = () => {
  const { setCurrentModel } = useUserDataModelContext();

  const { sendRequest: sendGetDataRequest, data: userData } = useHttp<
    UserData | undefined
  >(apiService.getAllUserData, false);

  const { getActiveSession, getActiveUser } = useSelectSession();

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
      const response = await apiService.addTransaction(
        sessionid,
        description,
        money,
        activeUser
      );

      if (response.error !== undefined) {
        return;
      }

      sendGetDataRequest();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData !== null) {
      setCurrentModel(userData);
    }
  }, [userData, setCurrentModel]);

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
          <CurrencyInputField updateAmount={updateAmountHandler} moneyAmount={moneyAmount} />
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
