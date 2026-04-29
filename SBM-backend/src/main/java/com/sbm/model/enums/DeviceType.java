package com.sbm.model.enums;

public enum DeviceType implements BaseEnum {

    CCTV        ("攝影機"),
    FIRE_ALARM  ("火災警報"),
    LIGHT       ("燈光"),
    ACCESS      ("門禁");

    private final String description;

    DeviceType(String description) {
        this.description = description;
    }

    @Override
    public String getDescription() {
        return description;
    }
}
