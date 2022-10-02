import styles from "./InfoSection.module.scss";

import { useSelectSession } from "../../context/SessionContext";
import { useMemo } from "react";
import { useUserDataModelContext } from "../../context/UserDataModelContext";
import { formatCurrency } from "../../utilities/formatCurrency";

type InfoSectionProps = {
  calculatedUsers: CalculatedPerson[];
};

export const InfoSection = (props: InfoSectionProps) => {
  const { getCurrentModel } = useUserDataModelContext();
  const { getActiveSession, getActiveUser } = useSelectSession();
  const { calculatedUsers } = props;

  const userId = useMemo(() => getActiveUser(), [getActiveUser]);
  const sessionId = useMemo(() => getActiveSession(), [getActiveSession]);
  const data = getCurrentModel();

  let displayUser =
    data.sessions &&
    data.sessions
      .find((session) => session.id === sessionId)
      ?.users.find((user) => user.userid === userId);

  const owed =
    calculatedUsers &&
    !calculatedUsers.find((user) => user.id === getActiveUser())?.owes;

  const totalChangeAmount = formatCurrency(
    (calculatedUsers &&
      calculatedUsers
        .find((user) => user.id === getActiveUser())
        ?.calculatedTransactions.map((transaction) => transaction.amount)
        .reduce((partialSum, next) => partialSum + next)) ??
      0
  );

  const totalStatus = owed
    ? `Owed ${totalChangeAmount}`
    : `Owes ${totalChangeAmount}`;

  return (
    <>
      <div className={styles.whole}>
        <span className={styles.section}>
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h2>{displayUser !== undefined && displayUser.username}</h2>
            <h3>{totalStatus}</h3>
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h4>
              {data.sessions !== undefined &&
                data.sessions.find((session) => session.id === sessionId)?.name}
            </h4>
            <h4 style={{ fontWeight: "500" }}>
              {data.sessions !== undefined &&
                `${
                  data.sessions.find((session) => session.id === sessionId)
                    ?.sessioncode
                }`}
            </h4>
          </span>
        </span>
      </div>
    </>
  );
};
