package com.example.demo;

import com.example.demo.service.ScenarioLoaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
@EnableScheduling
public class DemoApplication implements CommandLineRunner {

	@Autowired
	private ScenarioLoaderService scenarioLoaderService;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("🚀 Initializing scenarios from JSON files...");
		
		// Load scenarios from JSON configuration files
		scenarioLoaderService.loadScenariosFromFiles();
		
		System.out.println("✅ Scenario initialization completed!");
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.addAllowedOrigin("http://localhost:3000");
		corsConfiguration.addAllowedOrigin("http://localhost:8000");
		corsConfiguration.addAllowedOrigin("http://localhost:8080");
		corsConfiguration.addAllowedOrigin("http://localhost:9000");
		corsConfiguration.addAllowedOrigin("http://localhost:5173");
		corsConfiguration.addAllowedOrigin("http://localhost:5174");
		corsConfiguration.addAllowedOrigin("http://localhost:5175");
		corsConfiguration.addAllowedOrigin("http://localhost:8001");
		corsConfiguration.addAllowedHeader("*");
		corsConfiguration.addAllowedMethod("*");
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);
		
		return new CorsFilter(source);
	}
}
