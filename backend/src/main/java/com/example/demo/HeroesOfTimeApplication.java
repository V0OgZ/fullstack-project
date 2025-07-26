package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling  // Active les tâches planifiées pour le self-triggering
public class HeroesOfTimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(HeroesOfTimeApplication.class, args);
    }

} 