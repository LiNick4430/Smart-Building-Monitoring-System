function DeviceTableCols() {
  return (
    <colgroup>
      <col style={{ width: '8%' }} />   {/* 序號 */}
      <col style={{ width: '42%' }} />  {/* 設備名稱 */}
      <col style={{ width: '25%' }} />  {/* 類型 */}
      <col style={{ width: '25%' }} />  {/* 狀態 */}
    </colgroup>
  );
}

export default DeviceTableCols;