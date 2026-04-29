package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sbm.model.entity.Device;
import com.sbm.model.enums.DeviceStatus;
import com.sbm.model.enums.DeviceType;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long>{

	// 搜尋 特定類型 的 方法
	List<Device> findByType(DeviceType type);
	
	// 搜尋 特定狀態 的 方法
	List<Device> findByStatus(DeviceStatus status);
}
