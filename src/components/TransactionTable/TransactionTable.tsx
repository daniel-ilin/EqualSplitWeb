import { useSelectSession } from "../../context/SessionContext";
import userData from "../../data/sessions.json";
import { TransactionItem } from "./TransactionItem";
import styles from "./TransactionTable.module.css";

export const TransactionTable = () => {
  const { getActiveSession, getActiveUser } = useSelectSession();

  const transactions = userData.sessions
    .find((session) => session.id === getActiveSession())
    ?.users.find((user) => user.userid === getActiveUser())?.transactions;

  return (
    <>
      <div className={styles["transactions"]}>
        <ul>
          {transactions?.map((transaction) => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
              calculated={false}
            ></TransactionItem>
          ))}
          <li className={styles.spacer}></li>
          {transactions?.map((transaction) => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
              calculated={true}
            ></TransactionItem>
          ))}
          <li className={styles.spacer}></li>
        </ul>
      </div>
    </>
  );
};
