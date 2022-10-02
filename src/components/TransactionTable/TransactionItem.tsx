import { useSelectSession } from "../../context/SessionContext";
import { useUserDataModelContext } from "../../context/UserDataModelContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { formatDate } from "../../utilities/formatDate";
import styles from "./TransactionItem.module.scss";
import arrowsStyles from ".././arrows/Arrow.module.css";
import { useState } from "react";
import { TransactionMenu } from "./TransactionMenu/TransactionMenu";
import CSSTransition from "react-transition-group/CSSTransition";
import apiService from "../../utilities/APIService";
import { useLoader } from "../../context/LoadingContext";

type TransactionItemProps = {
  transaction: Transaction;
  calculated: boolean;
  switchScrollStateHandler: () => void;
  editable: boolean;
};

export const TransactionItem = (props: TransactionItemProps) => {
  const { getCurrentModel } = useUserDataModelContext();
  const { getActiveUser, getActiveSession } = useSelectSession();
  const { setLoader } = useLoader();
  const [arrowShowing, setArrowShowing] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);

  let owned = false;

  if (getCurrentModel().activeUser !== undefined) {
    owned = getActiveUser() === getCurrentModel().activeUser.id;
  }

  let style = owned
    ? `${styles["item-frame"]} ${styles["sent"]}`
    : `${styles["item-frame"]} ${styles["sent"]} ${styles["sentReversed"]}`;

  const mouseEnterHandler = () => {
    props.editable && setArrowShowing(true);
  };

  const mouseLeaveHandler = () => {
    setArrowShowing(false);
  };

  const showMenuHandler = () => {
    props.switchScrollStateHandler();
    setMenuExpanded((prevState) => {
      return !prevState;
    });
  };

  const deleteTransaction = () => {
    setLoader(true);
    apiService.deleteTransaction(props.transaction.id, getActiveSession());
  };

  return (
    <>
      <div
        className={style}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <li>
          <span>
            <h3
              style={{
                overflow: "hidden",
                overflowWrap: "anywhere",
                whiteSpace: "normal",
                height: "auto",
                marginBottom: "10px",
              }}
            >
              {props.transaction.description}
            </h3>
            <h4 className={styles.date}>
              {formatDate(new Date(props.transaction.date))}
            </h4>
          </span>
          <span
            style={{
              position: "relative",
              marginLeft: "10px",
              alignSelf: "center",
            }}
          >
            <h4>{formatCurrency(+props.transaction.amount)}</h4>
          </span>
        </li>
        {arrowShowing && (
          <div className={styles.itemarrow} onClick={showMenuHandler}>
            <i className={arrowsStyles.bottom} />
          </div>
        )}
        <CSSTransition
          in={menuExpanded}
          mountOnEnter={true}
          unmountOnExit={true}
          timeout={0}
        >
          <span style={{ position: "absolute", right: "0", top: "0" }}>
            <TransactionMenu
              hideMenuHandler={showMenuHandler}
              deleteTransactionHandler={deleteTransaction}
              transaction={props.transaction}
            />
          </span>
        </CSSTransition>
      </div>
    </>
  );
};
