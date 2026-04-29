import useDevices from '../../hooks/useDevices';
import DeviceTable from './DeviceTable';

function Dashboard() {
  const { devices, loading, error } = useDevices();

  if (loading) return <p className="status-msg">載入中...</p>;
  if (error) return <p className="status-msg error">{error}</p>;

  return (
    <div className="dashboard">
      <h2>設備狀態總覽</h2>
      <p className="subtitle">共 {devices.length} 台設備｜即時監控中</p>
      <DeviceTable devices={devices} />
    </div>
  );
}

export default Dashboard;