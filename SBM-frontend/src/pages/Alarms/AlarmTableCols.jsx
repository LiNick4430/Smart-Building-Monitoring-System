function AlarmTableCols() {
  return (
    <colgroup>
      <col style={{ width: '8%' }} />   {/* 序號 */}
      <col style={{ width: '32%' }} />  {/* 設備名稱 */}
      <col style={{ width: '15%' }} />  {/* 變更前 */}
      <col style={{ width: '15%' }} />  {/* 變更後 */}
      <col style={{ width: '30%' }} />  {/* 時間 */}
    </colgroup>
  );
}

export default AlarmTableCols;