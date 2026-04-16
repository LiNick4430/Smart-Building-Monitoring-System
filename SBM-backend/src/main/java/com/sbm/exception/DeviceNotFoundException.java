package com.sbm.exception;

import org.springframework.http.HttpStatus;

public class DeviceNotFoundException extends BaseException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DeviceNotFoundException(String message) {
		super(message, 
				HttpStatus.UNAUTHORIZED, 
				ErrorCode.DEVICE_NOT_FOUND);
	}

}
