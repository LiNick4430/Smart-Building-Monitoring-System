import { useCallback, useEffect, useState } from 'react';
import alarmService from '../services/alarmService';

const MIN_LOADING_MS = 800;

function useAlarms() {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceFilter, setDeviceFilter] = useState(''); // 篩選用的 deviceId

  const fetchAlarms = useCallback(() => {
    setLoading(true);
    setError(null);

    const start = Date.now();
    const request = deviceFilter
      ? alarmService.getAlarmsByDevice(deviceFilter)
      : alarmService.getAllAlarms();

    request
      .then(data => {
        const remaining = MIN_LOADING_MS - (Date.now() - start);
        setTimeout(() => {
          setAlarms(data);
          setLoading(false);
        }, Math.max(0, remaining));
      })
      .catch(() => {
        const remaining = MIN_LOADING_MS - (Date.now() - start);
        setTimeout(() => {
          setError('無法取得警報紀錄');
          setLoading(false);
        }, Math.max(0, remaining));
      });
  }, [deviceFilter]);

  useEffect(() => {
    fetchAlarms();
  }, [fetchAlarms]);

  return { alarms, loading, error, refetch: fetchAlarms, deviceFilter, setDeviceFilter };
}

export default useAlarms;