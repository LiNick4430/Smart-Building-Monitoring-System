import useAlarms from '@/hooks/useAlarms';
import useDevices from '@/hooks/useDevices';
import styles from './Alarms.module.css';

import AlarmTableSkeleton from './AlarmTableSkeleton';
import AlarmTableCols from './AlarmTableCols';

const STATUS_LABEL = {
  ONLINE: { text: '正常', styleKey: 'status-online' },
  OFFLINE: { text: '離線', styleKey: 'status-offline' },
  ALARM: { text: '警報', styleKey: 'status-alarm' },
};

function StatusBadge({ status }) {
  const s = STATUS_LABEL[status] ?? { text: status, styleKey: '' };
  return (
    <span className={`${styles['status-badge']} ${styles[s.styleKey] || ''}`}>
      {s.text}
    </span>
  );
}

function formatDateTime(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
}

function Alarms() {
  const { alarms, loading, error, refetch, deviceFilter, setDeviceFilter } = useAlarms();
  const { devices } = useDevices();

  const handleFilterChange = (e) => {
    setDeviceFilter(e.target.value);
  };

  return (
    <div className={styles.alarms}>
      <h2>警報紀錄</h2>

      {/* 篩選列 */}
      <div className={styles.toolbar}>
        <select
          className={styles.select}
          value={deviceFilter}
          onChange={handleFilterChange}
        >
          <option value="">所有設備</option>
          {devices.map(d => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.deviceName}
            </option>
          ))}
        </select>
        <p className={styles.subtitle}>
          共 {alarms.length} 筆紀錄
        </p>
      </div>

      {/* 載入中 */}
      {loading && <AlarmTableSkeleton rows={6} />}

      {/* 錯誤 */}
      {!loading && error && (
        <div className={styles.errorCard}>
          <p className={styles.errorTitle}>⚠️ 無法連線到伺服器</p>
          <p className={styles.errorMsg}>請確認後端服務是否正常運行</p>
          <button className={styles.retryBtn} onClick={refetch}>重新嘗試</button>
        </div>
      )}

      {/* 空狀態 */}
      {!loading && !error && alarms.length === 0 && (
        <div className={styles['empty-state']}>目前沒有警報紀錄</div>
      )}

      {/* 資料表格 */}
      {!loading && !error && alarms.length > 0 && (
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
            {alarms.map((log, index) => (
              <tr key={log.logId}>  {/* key 還是用 logId，保持 React 唯一性 */}
                <td>{index + 1}</td>  {/* 顯示改成序號 */}
                <td>{log.deviceName}</td>
                <td><StatusBadge status={log.fromStatus} /></td>
                <td><StatusBadge status={log.toStatus} /></td>
                <td>{formatDateTime(log.lastUpdate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Alarms;