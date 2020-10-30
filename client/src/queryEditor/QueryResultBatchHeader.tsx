import React from 'react';
import HSpacer from '../common/HSpacer';
import SecondsTimer from '../common/SecondsTimer';
import {
  useLastStatementId,
  useSessionBatch,
  useSessionIsRunning,
  useSessionRunQueryStartTime,
} from '../stores/editor-store';
import styles from './QueryResultHeader.module.css';

function QueryResultBatchHeader() {
  const isRunning = useSessionIsRunning();
  const runQueryStartTime = useSessionRunQueryStartTime();
  const lastStatementId = useLastStatementId();

  const batch = useSessionBatch();
  const numOfStatements = batch?.statements.length || 0;

  let timerContent = null;
  if (isRunning) {
    timerContent = (
      <div>
        <SecondsTimer startTime={runQueryStartTime} /> seconds
      </div>
    );
  } else if (lastStatementId && batch?.durationMs !== undefined) {
    const serverSec = batch?.durationMs / 1000;
    timerContent = <div>{serverSec} seconds</div>;
  }

  return (
    <div className={styles.toolbar}>
      <HSpacer />
      {numOfStatements > 0 && <div>{numOfStatements} statements</div>}
      <HSpacer grow />
      {timerContent}
      <HSpacer size={1} />
    </div>
  );
}

export default React.memo(QueryResultBatchHeader);