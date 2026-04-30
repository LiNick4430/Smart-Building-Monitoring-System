import api from './api';

const alarmService = {
  getAllAlarms: async () => {
    const res = await api.get('/api/alarms');
    return res.data.data;
  },
  getAlarmsByDevice: async (deviceId) => {
    const res = await api.get(`/api/alarms/device/${deviceId}`);
    return res.data.data;
  },
};

export default alarmService;