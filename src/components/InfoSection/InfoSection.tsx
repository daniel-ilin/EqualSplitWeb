import styles from "./InfoSection.module.css";

import { useSelectSession } from "../../context/SessionContext";
import { useMemo } from "react";
import { useUserDataModelContext } from "../../context/UserDataModelContext";

export const InfoSection = () => {
  const { getCurrentModel } = useUserDataModelContext();
  const { getActiveSession, getActiveUser } = useSelectSession();

  const userId = useMemo(() => getActiveUser(), [getActiveUser]);
  const sessionId = useMemo(() => getActiveSession(), [getActiveSession]);
  const data = getCurrentModel();

  return (
    <>
      <div className={styles.whole}>
        <span className={styles.section}>
          <h2>
            {data.sessions !== undefined &&
              data.sessions
                .find((session) => session.id === sessionId)
                ?.users.find((user) => user.userid === userId)?.username}
          </h2>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <h4>
              {data.sessions !== undefined &&
                data.sessions.find((session) => session.id === sessionId)?.name}
            </h4>
            <h4 style={{ fontWeight: "500" }}>
              {data.sessions !== undefined &&
                `(${
                  data.sessions.find((session) => session.id === sessionId)
                    ?.sessioncode
                })`}
            </h4>
          </span>
        </span>
        <span>
          {/* <ProgressBar
            completed={20}
            customLabel=" "
            className={styles["bar-wrapper"]}
            barContainerClassName={styles["container"]}
            completedClassName={styles["barCompleted"]}
          ></ProgressBar> */}
        </span>
      </div>
    </>
  );
};
