import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";
import styles from "./CurrencyInputField.module.css";

type CurrencyInputFieldProps = {
  updateAmount: (amount: number) => void;
  moneyAmount: number;
};

export const CurrencyInputField = (props: CurrencyInputFieldProps) => {
  const moneyAmountRef = useRef<HTMLInputElement>(null);

  const [moneyAmountDisplay, setMoneyAmountDisplay] = useState("$0.00");
  const [moneyInputting, setMoneyInputting] = useState("");

  const changeAmountHandler = () => {
    if (
      moneyAmountRef.current === undefined ||
      moneyAmountRef.current === null ||
      moneyAmountRef.current.value === ""
    ) {
      setMoneyInputting("");
      setMoneyAmountDisplay("$0.00");
      props.updateAmount(0);
    } else {
      setMoneyInputting("inputting");
      setMoneyAmountDisplay(formatCurrency(+moneyAmountRef.current.value));
      props.updateAmount(+moneyAmountRef.current.value);
    }
  };

  useEffect(() => {
    if (!moneyAmountRef.current) return;
    if (
      props.moneyAmount === undefined ||
      props.moneyAmount === null ||
      props.moneyAmount === 0
    ) {
      setMoneyInputting("");
      setMoneyAmountDisplay("$0.00");
      moneyAmountRef.current.value = "";
    }
  }, [props.moneyAmount]);

  return (
    <>
      <div className={`${styles.inputholder} ${styles[`${moneyInputting}`]}`}>
        <input
          className={styles["amount-hidden"]}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
            if (
              /[0]/.test(event.key) &&
              moneyAmountRef.current?.value.length === 0
            ) {
              event.preventDefault();
            }

            if (
              moneyAmountRef.current?.value !== undefined &&
              moneyAmountRef.current?.value.length > 11
            ) {
              event.preventDefault();
            }
          }}
          onChange={() => changeAmountHandler()}
          ref={moneyAmountRef}
        ></input>
        <h5>{moneyAmountDisplay}</h5>
      </div>
    </>
  );
};
