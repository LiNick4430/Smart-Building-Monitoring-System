package com.sbm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sbm.model.entity.Device;
import com.sbm.service.DeviceService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/devices")		// API 的網址
@RequiredArgsConstructor
@CrossOrigin(origins = "*")			// 允許 前端 跨域 請求
public class DeviceController {
	
	private final DeviceService deviceService;
	
	@GetMapping
    public List<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }
	
	// 模擬觸發警報的 API (例如: PUT /api/devices/1/status?status=ALARM)
    @PutMapping("/{id}/status")
    public Device updateStatus(@PathVariable Long id, @RequestParam String status) {
        return deviceService.updateDeviceStatus(id, status);
    }
}
