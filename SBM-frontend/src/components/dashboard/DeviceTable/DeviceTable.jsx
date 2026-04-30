import styles from './DeviceTable.module.css';
import DeviceTableCols from './DeviceTableCols';

const STATUS_LABEL = {
  ONLINE: { text: '正常', styleKey: 'status-online' },
  OFFLINE: { text: '離線', styleKey: 'status-offline' },
  ALARM: { text: '警報', styleKey: 'status-alarm' },
};

const TYPE_LABEL = {
  CCTV: '📷 攝影機',
  FIRE_ALARM: '🔥 火災警報',
  LIGHT: '💡 燈光',
  ACCESS: '🔐 門禁',
};

function DeviceTable({ devices, onRowClick }) {

  // 沒有設備資料
  if (devices.lenght === 0) {
    return (
      <div className={styles['empty-state']}>
        目前沒有設備資料
      </div>
    );
  }

  // 有設備資料
  return (
    <table className={styles['device-table']}>
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
        {devices.length === 0 ? (
          <tr>
            <td colSpan={4} className={styles['empty-state']}>
              沒有符合條件的設備
            </td>
          </tr>
        ) : (
          devices.map((device, index) => {
            const status = STATUS_LABEL[device.deviceStatus] ?? { text: device.deviceStatus, styleKey: '' };
            return (
              <tr
                key={device.deviceId}
                onClick={() => onRowClick?.(device)}
                className={styles.clickableRow}
              >
                <td>{index + 1}</td>
                <td>{device.deviceName}</td>
                <td>{TYPE_LABEL[device.deviceType] ?? device.deviceType}</td>
                <td>
                  <span className={`${styles['status-badge']} ${styles[status.styleKey] || ''}`}>
                    {status.text}
                  </span>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default DeviceTable;