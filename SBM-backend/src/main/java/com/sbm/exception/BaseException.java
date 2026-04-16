package com.sbm.exception;

import org.springframework.http.HttpStatus;

//自定義 基本錯誤 (和 GlobalExceptionHandler 連動)
public abstract class BaseException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private final HttpStatus httpStatus;
	private final ErrorCode errorCode;
	
	protected BaseException(String message, HttpStatus httpStatus, ErrorCode errorCode) {
		super(message);
		this.httpStatus = httpStatus;
		this.errorCode = errorCode;
	}
	
	public HttpStatus getHttpStatus() { return httpStatus; }
	public ErrorCode getErrorCode() { return errorCode; }
}
