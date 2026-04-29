package com.sbm.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.sbm.exception.DeviceNotFoundException;
import com.sbm.exception.DeviceStatusNotChangedException;
import com.sbm.model.dto.DeviceDTO;
import com.sbm.model.entity.AlarmLog;
import com.sbm.model.entity.Device;
import com.sbm.model.enums.BaseEnum;
import com.sbm.model.enums.DeviceStatus;
import com.sbm.repository.AlarmLogRepository;
import com.sbm.repository.DeviceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeviceService {

	private final DeviceRepository deviceRepository;
	private final AlarmLogRepository alarmLogRepository;
	
	private final SimpMessagingTemplate simpMessagingTemplate;		// Spring 提供的 WebSocket 訊息發送工具
	
	private final ModelMapper modelMapper;
	
	// 取得所有裝置狀態
	public List<DeviceDTO> getAllDevices() {
		return deviceRepository.findAll().stream()
				.map(device -> modelMapper.map(device, DeviceDTO.class))
				.toList();
	}
	
	// 更新 特定裝備 的 狀態
	public DeviceDTO updateDeviceStatus(Long id, String statusStr) {
		
		// 1. 驗證並轉換 Enum（統一由 BaseEnum.fromCode 處理）
	    DeviceStatus newStatus = BaseEnum.fromCode(DeviceStatus.class, statusStr);
	    
		// 2. 找尋目標設備, 找不到則拋出錯誤
		Device device = deviceRepository.findById(id)
				.orElseThrow(() -> new DeviceNotFoundException("找不到該裝置"));
		
		// 3. 前後狀態相同 → 提早跳出
	    if (device.getStatus() == newStatus) {
	        throw new DeviceStatusNotChangedException(
	            String.format("設備「%s」狀態已經是 %s，無需變更", device.getName(), newStatus)
	        );
	    }
		
		// 2. 記錄變更前的狀態
	    DeviceStatus fromStatus = device.getStatus();
		
		// 3. 改變設備狀態
		device.setStatus(newStatus);
		Device updateDevice = deviceRepository.save(device);
		
		// 4. 寫入 AlarmLog (新增)
        AlarmLog log = new AlarmLog();
        log.setDevice(updateDevice);
        log.setFromStatus(fromStatus);
        log.setToStatus(newStatus);
        alarmLogRepository.save(log);
		
        // 5. WebSocket 推播
		DeviceDTO deviceDTO = modelMapper.map(updateDevice, DeviceDTO.class);
		simpMessagingTemplate.convertAndSend("/topic/status", deviceDTO);
		
		return deviceDTO;
	}
}
