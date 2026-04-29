const STATUS_LABEL = {
  ONLINE: { text: '正常', className: 'status-online' },
  OFFLINE: { text: '離線', className: 'status-offline' },
  ALARM: { text: '警報', className: 'status-alarm' },
};

const TYPE_LABEL = {
  CCTV: '📷 攝影機',
  FIRE_ALARM: '🔥 火災警報',
  LIGHT: '💡 燈光',
  ACCESS: '🔐 門禁',
};

function DeviceTable({ devices }) {
  return (
    <table className="device-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>設備名稱</th>
          <th>類型</th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        {devices.map(device => {
          const status = STATUS_LABEL[device.deviceStatus] ?? { text: device.deviceStatus, className: '' };
          return (
            <tr key={device.deviceId}>
              <td>{device.deviceId}</td>
              <td>{device.deviceName}</td>
              <td>{TYPE_LABEL[device.deviceType] ?? device.deviceType}</td>
              <td>
                <span className={`status-badge ${status.className}`}>
                  {status.text}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DeviceTable;