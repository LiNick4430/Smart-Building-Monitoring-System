package com.sbm.exception;

import org.springframework.http.HttpStatus;

public class DeviceStatusNotChangedException extends BaseException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DeviceStatusNotChangedException(String message) {
		super(message, 
				HttpStatus.BAD_REQUEST, 
				ErrorCode.DEVICE_STATUS_NOT_CHANGED);
	}

}
