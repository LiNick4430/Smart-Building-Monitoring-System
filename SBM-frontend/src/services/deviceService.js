import api from './api';

const deviceService = {
  getAllDevices: async () => {
    const res = await api.get('/api/devices');
    return res.data.data;
  },
  updateDeviceStatus: async (id, status) => {
    const res = await api.put(`/api/devices/${id}/status`, null, {
      params: { status }
    });
    return res.data.data;
  },
};

export default deviceService;