package com.sbm.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "devices")
@Getter
@Setter
@NoArgsConstructor
public class Device extends BaseEntity{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;     // 裝置名稱，例如：1F大廳攝影機

    @Column(nullable = false)
    private String type;     // 類型：CCTV, FIRE_ALARM, LIGHT

    @Column(nullable = false)
    private String status;   // 狀態：ONLINE, OFFLINE, ALARM

}
