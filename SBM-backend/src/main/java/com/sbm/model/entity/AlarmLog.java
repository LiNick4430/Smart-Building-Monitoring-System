package com.sbm.model.entity;

import com.sbm.model.enums.DeviceStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "alarm_logs")
@Getter
@Setter
@NoArgsConstructor
public class AlarmLog extends BaseEntity{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id", nullable = false)
    private Device device;          // 關聯到哪台設備

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeviceStatus fromStatus;      // 變更前狀態

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeviceStatus toStatus;        // 變更後狀態
	
}
