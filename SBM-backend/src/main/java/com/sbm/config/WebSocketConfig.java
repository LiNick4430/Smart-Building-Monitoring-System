package com.sbm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{

	// 前端連線的端點，允許 React 的跨域請求
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws-monitoring")	// 前端連接的網址, ex: http://localhost:8080/ws-monitoring
				.setAllowedOriginPatterns("*")	// 允許跨域請求(CORS)
				.withSockJS();					// 啟用 SockJS fallback 機制, 不支援時自動降級(WebSocket → XHR → long polling), 提高相容性
	}

	// 設定訊息代理的前綴。前端訂閱 /topic/notifications 就能收到即時訊息
	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic");				// 啟用「內建簡單訊息代理」, 負責「廣播訊息給訂閱者」
		config.setApplicationDestinationPrefixes("/app");	// 設定「前端送訊息到後端的前綴」
	}
	
}
