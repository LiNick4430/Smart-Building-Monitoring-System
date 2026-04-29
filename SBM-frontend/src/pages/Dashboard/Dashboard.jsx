import useDevices from '@/hooks/useDevices';
import DeviceTable from '@/components/dashboard/DeviceTable';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { devices, loading, error } = useDevices();

  if (loading) return <p className={styles.statusMsg}>載入中...</p>;

  if (error)
    return (
      <p className={`${styles.statusMsg} ${styles.statusMsgError}`}>
        {error}
      </p>
    );

  return (
    <div className={styles.dashboard}>
      <h2>設備狀態總覽</h2>
      <p className={styles.subtitle}>共 {devices.length} 台設備｜即時監控中</p>
      <DeviceTable devices={devices} />
    </div>
  );
}

export default Dashboard;