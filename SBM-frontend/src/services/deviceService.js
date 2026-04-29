import api from './api';

const deviceService = {
  getAllDevices: () => api.get('/api/devices'),
  updateDeviceStatus: (id, status) => api.put(`/api/devices/${id}/status?status=${status}`),
};

export default deviceService;