import styles from './DeviceTableSkeleton.module.css';
import DeviceTableCols from './DeviceTableCols';

const COL_COUNT = 4;

function DeviceTableSkeleton({ rows = 8 }) {
  return (
    <table className={styles['skeleton-table']}>
      <DeviceTableCols />
      <thead>
        <tr>
          <th>序號</th>
          <th>設備名稱</th>
          <th>類型</th>
          <th>狀態</th>
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

export default DeviceTableSkeleton;