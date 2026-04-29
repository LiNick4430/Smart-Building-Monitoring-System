import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import deviceService from '../services/deviceService';

function useDevices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 初始載入
  useEffect(() => {
    deviceService.getAllDevices()
      .then(res => setDevices(res.data.data))
      .catch(() => setError('無法取得設備資料'))
      .finally(() => setLoading(false));
  }, []);

  // WebSocket 訂閱即時更新
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
      onConnect: () => {
        client.subscribe('/topic/status', (message) => {
          const updated = JSON.parse(message.body);
          setDevices(prev =>
            prev.map(d => d.deviceId === updated.deviceId ? updated : d)
          );
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, []);

  return { devices, loading, error };
}

export default useDevices;