import styles from './DeviceTable.module.css';
import DeviceTableCols from './DeviceTableCols';

import { STATUS_LABEL, TYPE_LABEL } from '@/constants/deviceEnums';

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