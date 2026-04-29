package com.sbm.model.enums;

public enum DeviceStatus implements BaseEnum{

	ONLINE  ("正常"),
    OFFLINE ("離線"),
    ALARM   ("警報");

    private final String description;

    DeviceStatus(String description) {
        this.description = description;
    }

    @Override
    public String getDescription() {
        return description;
    }
	
}
