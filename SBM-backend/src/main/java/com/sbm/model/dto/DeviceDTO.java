package com.sbm.model.dto;

import com.sbm.model.enums.DeviceStatus;
import com.sbm.model.enums.DeviceType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeviceDTO {

    private Long deviceId;			// 設備ID 
    private String deviceName;		// 設備名稱
    private DeviceType deviceType;		// 設備類型
    private DeviceStatus deviceStatus;	// 設備狀態
    
}
