// src/hooks/useFilteredDevices.js
import { useState, useMemo } from 'react';

const FLOOR_MAP = {
  '1F': '1F',
  '2F': '2F',
  '3F': '3F',
  'B1': 'B1',
};

function useFilteredDevices(devices) {
  const [filters, setFilters] = useState({
    floor: '',
    type: '',
    status: '',
  });

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ floor: '', type: '', status: '' });
  };

  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
      const matchFloor = !filters.floor || device.deviceName.startsWith(filters.floor);
      const matchType = !filters.type || device.deviceType === filters.type;
      const matchStatus = !filters.status || device.deviceStatus === filters.status;
      return matchFloor && matchType && matchStatus;
    });
  }, [devices, filters]);

  return { filteredDevices, filters, setFilter, resetFilters };
}

export default useFilteredDevices;