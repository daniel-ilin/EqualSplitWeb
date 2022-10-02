import { formatCurrency } from "../../utilities/formatCurrency";
import styles from "./TransactionItem.module.scss";

type CalculatedTransactionItemProps = {
  transaction: CalculatedTransaction;
  calculated: boolean;
  owed: boolean;
  calculatedUsers: CalculatedPerson[];
};

export const CalculatedTransactionItem = (
  props: CalculatedTransactionItemProps
) => {
  const receiver =
    props.transaction.receiverid !== null
      ? props.calculatedUsers.find(
          (person) => person.id === props.transaction.receiverid
        )?.name
      : "";

  const sender =
    props.transaction.senderid !== null
      ? props.calculatedUsers.find(
          (person) => person.id === props.transaction.senderid
        )?.name
      : "";

  // let owned = false;

  // if (getCurrentModel().activeUser !== undefined) {
  //   owned = getActiveUser() === getCurrentModel().activeUser.id;
  // }

  let style = `${styles["item-frame"]} ${styles["calculated"]}`;

  return (
    <>
      <div className={style}>
        <li>
          {props.owed ? (
            <h4>
              {`Owed ${formatCurrency(
                props.transaction.amount
              )} from ${sender}`}
            </h4>
          ) : (
            <h4>
              {`Owes ${formatCurrency(
                props.transaction.amount
              )} to ${receiver}`}
            </h4>
          )}
        </li>
      </div>
    </>
  );
};
