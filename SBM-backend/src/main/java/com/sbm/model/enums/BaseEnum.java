package com.sbm.model.enums;

import java.util.Arrays;
import java.util.stream.Collectors;

import com.sbm.exception.EnumNotFoundException;

public interface BaseEnum {

	// name()（資料庫儲存用）
	default String getCode() {
		return ((Enum<?>) this).name();
	}

	// 中文顯示（前端顯示使用）
	String getDescription();

	// 前端傳來的字串 → 轉成對應的 Enum
	static <E extends Enum<E> & BaseEnum> E fromCode(Class<E> enumClass, String code) {
		if (code == null || code.isBlank()) {
			throw new EnumNotFoundException(
					String.format("[%s] 值不能為空", enumClass.getSimpleName())
					);
		}

		code = code.trim().toUpperCase();

		for (E e : enumClass.getEnumConstants()) {
			if (e.getCode().equals(code)) {
				return e;
			}
		}

		// 自動列出所有合法值，方便 debug
		String validValues = Arrays.stream(enumClass.getEnumConstants())
				.map(BaseEnum::getCode)
				.collect(Collectors.joining(", "));

		throw new EnumNotFoundException(
				String.format("[%s] 無效的值：\"%s\"，合法值為：%s",
						enumClass.getSimpleName(), code, validValues)
				);
	}

}
