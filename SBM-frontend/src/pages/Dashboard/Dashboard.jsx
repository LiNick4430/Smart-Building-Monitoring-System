import { useState } from 'react';

import useDevices from '@/hooks/useDevices';
import useFilteredDevices from '@/hooks/useFilteredDevices';

import DeviceTable from '@/components/dashboard/DeviceTable/DeviceTable';
import DeviceTableSkeleton from '@/components/dashboard/DeviceTable/DeviceTableSkeleton';
import FilterSidebar from '@/components/dashboard/FilterSidebar';
import DeviceModal from '@/components/dashboard/DeviceModal';

import styles from './Dashboard.module.css';

function Dashboard() {
  const { devices, loading, error, refetch } = useDevices();
  const { filteredDevices, filters, setFilter, resetFilters } = useFilteredDevices(devices);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Modal 變更成功後，透過 WebSocket 已經會更新，但這裡再 refetch 確保一致
  const handleSuccess = () => { };

  return (
    <div className={styles.page}>

      <div className={styles.pageHeader}>
        <h2>設備狀態總覽</h2>
        <p className={styles.subtitle}>
          顯示 {filteredDevices.length} 台｜即時監控中
        </p>
      </div>

      <div className={styles.layout}>

        <FilterSidebar
          filters={filters}
          setFilter={setFilter}
          resetFilters={resetFilters}
          totalCount={devices.length}
          filteredCount={filteredDevices.length}
        />

        <div className={styles.content}>
          {loading && <DeviceTableSkeleton rows={8} />}

          {!loading && error && (
            <div className={styles.errorCard}>
              <p className={styles.errorTitle}>⚠️ 無法連線到伺服器</p>
              <p className={styles.errorMsg}>請確認後端服務是否正常運行</p>
              <button className={styles.retryBtn} onClick={refetch}>重新嘗試</button>
            </div>
          )}

          {!loading && !error && (
            <DeviceTable
              devices={filteredDevices}
              onRowClick={setSelectedDevice}
            />
          )}
        </div>

      </div>

      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
          onSuccess={handleSuccess}
        />
      )}

    </div>
  );
}

export default Dashboard;