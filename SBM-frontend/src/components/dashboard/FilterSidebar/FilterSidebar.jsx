// src/components/dashboard/FilterSidebar/FilterSidebar.jsx
import styles from './FilterSidebar.module.css';

const FLOORS = ['1F', '2F', '3F', 'B1'];

const TYPES = [
  { value: 'CCTV', label: '📷 攝影機' },
  { value: 'FIRE_ALARM', label: '🔥 火災警報' },
  { value: 'LIGHT', label: '💡 燈光' },
  { value: 'ACCESS', label: '🔐 門禁' },
];

const STATUSES = [
  { value: 'ONLINE', label: '正常' },
  { value: 'OFFLINE', label: '離線' },
  { value: 'ALARM', label: '警報' },
];

function FilterGroup({ title, options, value, onChange }) {
  return (
    <div className={styles.group}>
      <p className={styles.groupTitle}>{title}</p>
      <div className={styles.options}>
        {options.map(opt => {
          const optValue = typeof opt === 'string' ? opt : opt.value;
          const optLabel = typeof opt === 'string' ? opt : opt.label;
          const isActive = value === optValue;
          return (
            <button
              key={optValue}
              className={`${styles.optBtn} ${isActive ? styles.active : ''}`}
              onClick={() => onChange(isActive ? '' : optValue)}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FilterSidebar({ filters, setFilter, resetFilters, totalCount, filteredCount }) {
  const hasFilter = filters.floor || filters.type || filters.status;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <p className={styles.title}>篩選條件</p>
        {hasFilter && (
          <button className={styles.resetBtn} onClick={resetFilters}>
            清除
          </button>
        )}
      </div>

      <FilterGroup
        title="樓層"
        options={FLOORS}
        value={filters.floor}
        onChange={v => setFilter('floor', v)}
      />
      <FilterGroup
        title="類型"
        options={TYPES}
        value={filters.type}
        onChange={v => setFilter('type', v)}
      />
      <FilterGroup
        title="狀態"
        options={STATUSES}
        value={filters.status}
        onChange={v => setFilter('status', v)}
      />

      <p className={styles.count}>
        顯示 {filteredCount} / {totalCount} 台
      </p>
    </aside>
  );
}

export default FilterSidebar;