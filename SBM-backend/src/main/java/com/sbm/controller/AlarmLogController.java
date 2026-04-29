package com.sbm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbm.model.dto.AlarmLogDTO;
import com.sbm.response.ApiResponse;
import com.sbm.service.AlarmLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/alarms")		// API 的網址
@RequiredArgsConstructor
@CrossOrigin(origins = "*")			// 允許 前端 跨域 請求
public class AlarmLogController {

	private final AlarmLogService alarmLogService;

    // 查詢所有警報紀錄
    @GetMapping
    public ApiResponse<List<AlarmLogDTO>> getAllAlarms() {
        return ApiResponse.success(
        		"取得所有警報紀錄成功", 
        		alarmLogService.getAllAlarms());
    }

    // 查詢特定設備的警報紀錄
    @GetMapping("/device/{deviceId}")
    public ApiResponse<List<AlarmLogDTO>> getAlarmsByDevice(@PathVariable Long deviceId) {
        return ApiResponse.success(
        		"取得設備警報紀錄成功", 
        		alarmLogService.getAlarmsByDevice(deviceId));
    }
	
}
