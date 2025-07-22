package com.example.demo;

import com.example.demo.service.ScenarioLoaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
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
}
