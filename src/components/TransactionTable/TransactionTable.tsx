import { useEffect, useRef, useState } from "react";
import { useSelectSession } from "../../context/SessionContext";
import { useUserDataModelContext } from "../../context/UserDataModelContext";
import { CalculatedTransactionItem } from "./CalculatedTransactionItem";
import { TransactionItem } from "./TransactionItem";
import styles from "./TransactionTable.module.css";

type TransactionTableProps = {
  editable: boolean;
  calculatedUsers: CalculatedPerson[];
};

export const TransactionTable = (props: TransactionTableProps) => {
  const { getActiveSession, getActiveUser } = useSelectSession();

  const { getCurrentModel } = useUserDataModelContext();

  let { calculatedUsers } = props;

  const data = getCurrentModel();

  const tableRef = useRef<HTMLDivElement>(null);

  const [scrollState, setScrollState] = useState(true);

  useEffect(() => {
    if (tableRef.current !== null) {
      const scroll =
        tableRef.current.scrollHeight - tableRef.current.clientHeight;
      tableRef.current.scrollTo(0, scroll);
    }
  }, []);

  const transactions =
    data.sessions !== undefined
      ? data.sessions
          .find((session) => session.id === getActiveSession())
          ?.users.find((user) => user.userid === getActiveUser())?.transactions
      : [];

  const owed =
    calculatedUsers !== undefined &&
    !calculatedUsers.find((user) => user.id === getActiveUser())?.owes;

  const switchScrollStateHandler = () => {
    setScrollState((prev) => !prev);
  };

  let scrollStyle = scrollState
    ? `${styles["transactions"]}`
    : `${styles["transactions"]} ${styles["noscroll"]}`;

  return (
    <>
      <div className={scrollStyle} ref={tableRef}>
        <ul>
          {transactions?.map((transaction) => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
              calculated={false}
              switchScrollStateHandler={switchScrollStateHandler}
              editable={props.editable}
            ></TransactionItem>
          ))}
          <li>
            <div className={styles.spacer}></div>
          </li>
          {calculatedUsers !== undefined &&
            calculatedUsers
              .find((user) => user.id === getActiveUser())
              ?.calculatedTransactions?.map((calculatedTransaction) => (
                <CalculatedTransactionItem
                  owed={owed !== undefined ? owed : false}
                  transaction={calculatedTransaction}
                  calculated={true}
                  key={calculatedTransaction.id}
                  calculatedUsers={calculatedUsers}
                />
              ))}
          <li>
            <div className={`${styles["spacer"]} ${styles["tall"]}`}></div>
          </li>
        </ul>
      </div>
    </>
  );
};
