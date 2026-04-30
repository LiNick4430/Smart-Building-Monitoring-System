import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import deviceService from '../services/deviceService';

const MIN_LOADING_MS = 800; // 最短顯示 skeleton 的時間

function useDevices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clientRef = useRef(null);   // 新增：用 ref 保存 client

  const fetchDevices = useCallback(() => {
    setLoading(true);
    setError(null);

    const start = Date.now();

    deviceService.getAllDevices()
      .then(data => {
        const elapsed = Date.now() - start;
        const remaining = MIN_LOADING_MS - elapsed;

        // 若 API 回來太快，等剩餘時間後再顯示
        setTimeout(() => {
          setDevices(data);
          setLoading(false);
        }, Math.max(0, remaining));
      })
      .catch(() => {
        const elapsed = Date.now() - start;
        const remaining = MIN_LOADING_MS - elapsed;

        setTimeout(() => {
          setError('無法取得設備資料');
          setLoading(false);
        }, Math.max(0, remaining));
      });
  }, []);

  // 初始載入
  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  // WebSocket 訂閱即時更新
  useEffect(() => {
    // 避免重複建立（StrictMode 會執行兩次）
    if (clientRef.current) return;

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

    clientRef.current = client;   // 記錄 client
    client.activate();

    return () => {
      client.deactivate();
      clientRef.current = null;   // 清除 ref
    };
  }, []);

  return { devices, loading, error, refetch: fetchDevices };
}

export default useDevices;