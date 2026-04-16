package com.sbm.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.sbm.exception.DeviceNotFoundException;
import com.sbm.model.dto.DeviceDTO;
import com.sbm.model.entity.Device;
import com.sbm.repository.DeviceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeviceService {

	private final DeviceRepository deviceRepository;
	private final SimpMessagingTemplate simpMessagingTemplate;		// Spring 提供的 WebSocket 訊息發送工具
	
	private final ModelMapper modelMapper;
	
	// 取得所有裝置狀態
	public List<DeviceDTO> getAllDevices() {
		return deviceRepository.findAll().stream()
				.map(device -> modelMapper.map(device, DeviceDTO.class))
				.toList();
	}
	
	// 更新 特定裝備 的 狀態
	public DeviceDTO updateDeviceStatus(Long id, String status) {
		// 1. 找尋目標設備, 找不到則拋出錯誤
		Device device = deviceRepository.findById(id)
				.orElseThrow(() -> new DeviceNotFoundException("找不到該裝置"));
		
		// 2. 改變設備狀態
		device.setStatus(status);
		Device updateDevice = deviceRepository.save(device);
		DeviceDTO deviceDTO = modelMapper.map(updateDevice, DeviceDTO.class);
		
		// 3. 更新的資料 推送給 所有訂閱 "/topic/status" 的 前端
		simpMessagingTemplate.convertAndSend("/topic/status", deviceDTO);
		
		// 4. 回傳資料 只給 發送請求 的 前端
		return deviceDTO;
	}
}
