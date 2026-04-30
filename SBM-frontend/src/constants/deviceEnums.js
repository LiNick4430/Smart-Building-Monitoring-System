// 共用常數檔

export const STATUS_LABEL = {
  ONLINE: { text: '正常', styleKey: 'status-online' },
  OFFLINE: { text: '離線', styleKey: 'status-offline' },
  ALARM: { text: '警報', styleKey: 'status-alarm' },
};

export const TYPE_LABEL = {
  CCTV: '📷 攝影機',
  FIRE_ALARM: '🔥 火災警報',
  LIGHT: '💡 燈光',
  ACCESS: '🔐 門禁',
};

export const STATUS_OPTIONS = [
  { value: 'ONLINE', label: '正常' },
  { value: 'OFFLINE', label: '離線' },
  { value: 'ALARM', label: '警報' },
];

export const TYPE_OPTIONS = [
  { value: 'CCTV', label: '📷 攝影機' },
  { value: 'FIRE_ALARM', label: '🔥 火災警報' },
  { value: 'LIGHT', label: '💡 燈光' },
  { value: 'ACCESS', label: '🔐 門禁' },
];