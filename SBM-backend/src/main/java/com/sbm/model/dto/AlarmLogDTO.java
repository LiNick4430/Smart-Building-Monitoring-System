package com.sbm.model.dto;

import java.time.LocalDateTime;

import com.sbm.model.enums.DeviceStatus;
import com.sbm.model.enums.DeviceType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AlarmLogDTO {

	private Long logId;             // 紀錄 ID
    private Long deviceId;          // 設備 ID
    private String deviceName;      // 設備名稱
    private DeviceType deviceType;      // 設備類型
    private DeviceStatus fromStatus;      // 變更前狀態
    private DeviceStatus toStatus;        // 變更後狀態
    private LocalDateTime lastUpdate; // 變更時間
	
}
