import styles from './Alarms.module.css';

import AlarmTableCols from './AlarmTableCols';

const COL_COUNT = 5;

function AlarmTableSkeleton({ rows = 6 }) {

  return (
    <table className={styles['alarm-table']}>
      <AlarmTableCols />
      <thead>
        <tr>
          <th>序號</th>
          <th>設備名稱</th>
          <th>變更前</th>
          <th>變更後</th>
          <th>時間</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            {Array.from({ length: COL_COUNT }).map((_, j) => (
              <td key={j}>
                <span className={styles.bone} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AlarmTableSkeleton;