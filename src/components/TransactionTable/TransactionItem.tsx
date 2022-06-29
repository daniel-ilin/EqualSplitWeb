import { formatCurrency } from "../../utilities/formatCurrency";
import styles from "./TransactionItem.module.css";

type TransactionItemProps = {
  transaction: Transaction;
  calculated: boolean;
};

export const TransactionItem = (props: TransactionItemProps) => {
  return (
    <>
      {!props.calculated ? (
        <div className={`${styles["item-frame"]} ${styles["sent"]}`}>
          <li>
            <span>
              <h3>Description</h3>
              <h4>Date</h4>
            </span>
            <span
              style={{
                position: "absolute",
                right: "10px",                
                alignSelf: "center",
              }}
            >
              <h4>$0.00</h4>
            </span>
          </li>
        </div>
      ) : (
        <div className={`${styles["item-frame"]} ${styles["calculated"]}`}>
          <li>
            <h4>Owes {formatCurrency(+props.transaction.amount)} to Name</h4>
          </li>
        </div>
      )}
    </>
  );
};
