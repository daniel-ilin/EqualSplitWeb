import { useEffect, useState } from "react";
import styles from "./CurrencyInputField.module.scss";
import CurrencyInput from "react-currency-input-field";
import { CurrencyInputProps } from "react-currency-input-field/dist/components/CurrencyInputProps";

type CurrencyInputFieldProps = {
  updateAmount: (amount: number) => void;
  moneyAmount: number;
};

export const CurrencyInputField = (props: CurrencyInputFieldProps) => {
  const limit = 999999999;
  const prefix = "$";

  const [value, setValue] = useState<string | number>("");

  useEffect(() => {
    let newVal = parseFloat(`${value}`) * 100;
    props.updateAmount(newVal);
  }, [props, value]);

  const handleOnValueChange: CurrencyInputProps["onValueChange"] = (
    value,
    _
  ): void => {
    if (!value) {
      setValue("");
      return;
    }

    if (Number(value) > limit) {
      setValue(value);
      return;
    }

    setValue(value);
  };

  return (
    <>
      <CurrencyInput
        id="validationCustom01"
        name="input-1"
        value={value}
        className={styles.input}
        onValueChange={handleOnValueChange}
        placeholder="$0.00"
        prefix={prefix}
        step={1}
        onKeyPress={(event) => {
          if (value !== undefined && value > 999999999) {
            event.preventDefault();
          }
        }}
      />
    </>
  );
};
