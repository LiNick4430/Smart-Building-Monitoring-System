// src/components/dashboard/DeviceModal/DeviceModal.jsx
import { useState } from 'react';
import deviceService from '@/services/deviceService';
import styles from './DeviceModal.module.css';

import { STATUS_LABEL, TYPE_LABEL, STATUS_OPTIONS } from '@/constants/deviceEnums';

function DeviceModal({ device, onClose, onSuccess }) {
  const [selected, setSelected] = useState(device.deviceStatus);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (selected === device.deviceStatus) {
      onClose();
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const updated = await deviceService.updateDeviceStatus(device.deviceId, selected);
      onSuccess(updated); // 回傳更新後的設備給父層
      onClose();
    } catch (e) {
      setError('變更失敗，請稍後再試');
    } finally {
      setSubmitting(false);
    }
  };

  const currentStatus = STATUS_LABEL[device.deviceStatus];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        <div className={styles.header}>
          <p className={styles.title}>{device.deviceName}</p>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.info}>
          <span className={styles.infoLabel}>類型</span>
          <span>{TYPE_LABEL[device.deviceType] ?? device.deviceType}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.infoLabel}>目前狀態</span>
          <span className={`${styles['status-badge']} ${styles[currentStatus?.styleKey]}`}>
            {currentStatus?.text}
          </span>
        </div>

        <div className={styles.divider} />

        <p className={styles.selectLabel}>變更狀態為</p>
        <select
          className={styles.select}
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>取消</button>
          <button
            className={styles.confirmBtn}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? '變更中...' : '確認變更'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeviceModal;