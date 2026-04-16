package com.sbm.response;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sbm.exception.ErrorCode;

import lombok.Getter;

@Getter
public class ApiResponse<T> {

	// 回傳資料 架構
	private int httpCode;			// HTTP 錯誤碼
	private String message;			// 訊息

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private T data;					// 成功：回傳資料

	@JsonInclude(JsonInclude.Include.NON_NULL)
	private ErrorCode errorCode;	// 失敗：失敗代碼

	// 成功 用 建構子
	private ApiResponse(int code, String message, T data) {
		this.httpCode = code;
		this.message = message;
		this.data = data;
	}

	// 失敗 用 建構子
	private ApiResponse(int code, String message, ErrorCode errorCode) {
		this.httpCode = code;
		this.message = message;
		this.errorCode = errorCode;
	}

	// 成功 用 方法
	public static <T> ApiResponse<T> success(String message, T data) {
		return new ApiResponse<T>(HttpStatus.OK.value(), message, data);
	}

	// 失敗 用 方法
	public static <T> ApiResponse<T> error(int code, String message, ErrorCode errorCode) {
		return new ApiResponse<T>(code, message, errorCode);
	}
}
