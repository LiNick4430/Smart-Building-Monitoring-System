package com.sbm.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeviceDTO {

    private Long deviceId;			// 設備ID 
    private String deviceName;		// 設備名稱
    private String deviceType;		// 設備類型
    private String deviceStatus;	// 設備狀態
    
}
