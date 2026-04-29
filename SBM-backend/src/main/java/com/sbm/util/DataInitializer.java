package com.sbm.util;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sbm.model.entity.Device;
import com.sbm.model.enums.DeviceStatus;
import com.sbm.model.enums.DeviceType;
import com.sbm.repository.DeviceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner{

	private final DeviceRepository deviceRepository;
	
	@Override
	public void run(String... args) throws Exception {
		// 避免重複灌資料
        if (deviceRepository.count() > 0) {
            log.info("資料庫已有資料，跳過初始化");
            return;
        }
        
        log.info("開始初始化設備資料...");

        // ── 1F ──────────────────────────────────
        createDevice("1F 大廳攝影機",      DeviceType.CCTV,       DeviceStatus.ONLINE);
        createDevice("1F 停車場攝影機",    DeviceType.CCTV,       DeviceStatus.ONLINE);
        createDevice("1F 大廳火災警報器",  DeviceType.FIRE_ALARM, DeviceStatus.ONLINE);
        createDevice("1F 大廳燈光",        DeviceType.LIGHT,      DeviceStatus.ONLINE);
        createDevice("1F 大廳門禁",        DeviceType.ACCESS,     DeviceStatus.ONLINE);

        // ── 2F ──────────────────────────────────
        createDevice("2F 會議室攝影機",    DeviceType.CCTV,       DeviceStatus.ONLINE);
        createDevice("2F 走廊攝影機",      DeviceType.CCTV,       DeviceStatus.OFFLINE);
        createDevice("2F 會議室火災警報器",DeviceType.FIRE_ALARM, DeviceStatus.ALARM);
        createDevice("2F 會議室燈光",      DeviceType.LIGHT,      DeviceStatus.ONLINE);
        createDevice("2F 會議室門禁",      DeviceType.ACCESS,     DeviceStatus.OFFLINE);

        // ── 3F ──────────────────────────────────
        createDevice("3F 辦公區攝影機",    DeviceType.CCTV,       DeviceStatus.ONLINE);
        createDevice("3F 辦公區火災警報器",DeviceType.FIRE_ALARM, DeviceStatus.ONLINE);
        createDevice("3F 辦公區燈光",      DeviceType.LIGHT,      DeviceStatus.ONLINE);
        createDevice("3F 辦公區門禁",      DeviceType.ACCESS,     DeviceStatus.ONLINE);

        // ── 地下室 ───────────────────────────────
        createDevice("B1 機房攝影機",      DeviceType.CCTV,       DeviceStatus.ONLINE);
        createDevice("B1 機房火災警報器",  DeviceType.FIRE_ALARM, DeviceStatus.ONLINE);
        createDevice("B1 機房門禁",        DeviceType.ACCESS,     DeviceStatus.ALARM);

        log.info("設備資料初始化完成，共新增 {} 筆", deviceRepository.count());
		
	}

	// 抽出建立設備的方法，避免重複程式碼
    private void createDevice(String name, DeviceType type, DeviceStatus status) {
        Device device = new Device();
        device.setName(name);
        device.setType(type);
        device.setStatus(status);
        deviceRepository.save(device);
    }
	
}
