package com.sbm.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sbm.model.dto.DeviceDTO;
import com.sbm.model.entity.Device;

@Configuration
public class ModelMapperConfig {

	@Bean
	ModelMapper modelMapper() {
		
		ModelMapper modelMapper = new ModelMapper();
		
		// Entity -> DTO
		modelMapper.typeMap(Device.class, DeviceDTO.class).addMappings(mapper -> {
			mapper.map(Device::getId, DeviceDTO::setDeviceId);
			mapper.map(Device::getName, DeviceDTO::setDeviceName);
			mapper.map(Device::getType, DeviceDTO::setDeviceType);
			mapper.map(Device::getStatus, DeviceDTO::setDeviceStatus);
		});
		
		return modelMapper;
	}
	
}
