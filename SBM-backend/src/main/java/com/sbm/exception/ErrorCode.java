package com.sbm.exception;

public enum ErrorCode {

	DEVICE_NOT_FOUND,			// 沒有找到設備
	DEVICE_STATUS_NOT_CHANGED,  // 狀態沒有變更
    INVALID_DEVICE_STATUS,      // 無效的狀態值
	
    INVALID_ENUM_VALUE,			// 統一的 Enum 錯誤碼
	
	RESOURCE_NOT_FOUND,
	SYSTEM_ERROR,
	
}
