package com.sbm.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sbm.model.dto.AlarmLogDTO;
import com.sbm.repository.AlarmLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlarmLogService {

	private final AlarmLogRepository alarmLogRepository;
	
	private final ModelMapper modelMapper;
	
	// 取得所有紀錄（最新的排前面）
	public List<AlarmLogDTO> getAllAlarms() {
		return alarmLogRepository.findAllByOrderByLastUpdateDesc().stream()
				.map(log -> modelMapper.map(log, AlarmLogDTO.class))
				.toList();
	}
	
	// 取得特定設備的紀錄
    public List<AlarmLogDTO> getAlarmsByDevice(Long deviceId) {
        return alarmLogRepository.findByDeviceIdOrderByLastUpdateDesc(deviceId).stream()
                .map(log -> modelMapper.map(log, AlarmLogDTO.class))
                .toList();
    }
}
