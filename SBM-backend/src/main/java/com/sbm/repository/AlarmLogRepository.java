package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbm.model.entity.AlarmLog;
import com.sbm.model.enums.DeviceStatus;

public interface AlarmLogRepository extends JpaRepository<AlarmLog, Long> {

	// 查詢特定設備的所有紀錄
    List<AlarmLog> findByDeviceIdOrderByLastUpdateDesc(Long deviceId);

    // 查詢特定狀態的所有紀錄 (例如查所有 ALARM)
    List<AlarmLog> findByToStatusOrderByLastUpdateDesc(DeviceStatus toStatus);
	
}
