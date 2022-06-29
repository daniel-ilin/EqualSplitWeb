import styles from "./InfoSection.module.css";
import data from "../../data/sessions.json";
import { useSelectSession } from "../../context/SessionContext";
import { useMemo } from "react";
import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";

export const InfoSection = () => {
  const { getActiveSession, getActiveUser } = useSelectSession();

  const userId = useMemo(() => getActiveUser(), [getActiveUser]);
  const sessionId = useMemo(() => getActiveSession(), [getActiveSession]);

  return (
    <>
      <div className={styles.whole}>
        <span className={styles.section}>
          <h2>
            {
              data.sessions
                .find((session) => session.id === sessionId)
                ?.users.find((user) => user.userid === userId)?.username
            }
          </h2>
          <h4>
            {data.sessions.find((session) => session.id === sessionId)?.name}
          </h4>
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
