package com.sbm.exception;

import org.springframework.http.HttpStatus;

public class EnumNotFoundException extends BaseException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EnumNotFoundException(String message) {
		super(message, 
				HttpStatus.BAD_REQUEST, 
				ErrorCode.INVALID_ENUM_VALUE);
	}

}
