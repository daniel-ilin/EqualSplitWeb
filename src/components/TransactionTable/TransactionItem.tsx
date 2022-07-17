import { useSelectSession } from "../../context/SessionContext";
import { useUserDataModelContext } from "../../context/UserDataModelContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { formatDate } from "../../utilities/formatDate";
import styles from "./TransactionItem.module.css";
import arrowsStyles from ".././arrows/Arrow.module.css";
import { useState } from "react";
import { TransactionMenu } from "./TransactionMenu/TransactionMenu";
import CSSTransition from "react-transition-group/CSSTransition";

type TransactionItemProps = {
  transaction: Transaction;
  calculated: boolean;
  switchScrollStateHandler: () => void;
};

export const TransactionItem = (props: TransactionItemProps) => {
  const { getCurrentModel } = useUserDataModelContext();
  const { getActiveUser } = useSelectSession();

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
    setArrowShowing(true);
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

  return (
    <>
      <div
        className={style}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <li>
          <span>
            <h3>{props.transaction.description}</h3>
            <h4>{formatDate(new Date(props.transaction.date))}</h4>
          </span>
          <span
            style={{
              position: "absolute",
              right: "10px",
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
          timeout={100}
          classNames={{
            enter: "",
            enterActive: styles["modal-open"],
            exit: "",
            exitActive: styles["modal-closed"],
          }}
        >
          <TransactionMenu hideMenuHandler={showMenuHandler} />
        </CSSTransition>
      </div>
    </>
  );
};
