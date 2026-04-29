package com.sbm.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.sbm.response.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j					// lombok 支援的 log
@RestControllerAdvice
public class GlobalExceptionHandler {

	// 自定義 錯誤 (和 BaseException 連動)
	@ExceptionHandler(BaseException.class)
	public ResponseEntity<ApiResponse<?>> handleBaseException(BaseException exception) {
		return ResponseEntity
				.status(exception.getHttpStatus())
				.body(ApiResponse.error(
						exception.getHttpStatus().value(), 
						exception.getMessage(), 
						exception.getErrorCode()));
	}
	
	// 其他 非預期性的錯誤 (500)
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<?>> handleRuntimeException(Exception exception) {
		log.error("系統發生非預期錯誤: ", exception);
		
		return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(), 
                        "系統發生非預期錯誤，請聯繫管理員", 
                        ErrorCode.SYSTEM_ERROR));
	}
	
	// 忽略靜態資源找不到的錯誤 (例如 favicon.ico)
	@ExceptionHandler(NoResourceFoundException.class)
	public ResponseEntity<ApiResponse<?>> handleNoResourceFoundException(NoResourceFoundException exception) {
	    return ResponseEntity
	            .status(HttpStatus.NOT_FOUND)
	            .body(ApiResponse.error(
	                    HttpStatus.NOT_FOUND.value(),
	                    "找不到靜態資源：" + exception.getResourcePath(),
	                    ErrorCode.RESOURCE_NOT_FOUND));
	}
}
