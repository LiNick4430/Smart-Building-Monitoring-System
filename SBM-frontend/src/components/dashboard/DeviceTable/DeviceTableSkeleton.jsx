import styles from './DeviceTableSkeleton.module.css';
import DeviceTableCols from './DeviceTableCols';

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
            <td><span className={styles.bone} style={{ width: '32px' }} /></td>
            <td><span className={styles.bone} style={{ width: '140px' }} /></td>
            <td><span className={styles.bone} style={{ width: '90px' }} /></td>
            <td><span className={styles.bone} style={{ width: '56px', borderRadius: '12px' }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DeviceTableSkeleton;