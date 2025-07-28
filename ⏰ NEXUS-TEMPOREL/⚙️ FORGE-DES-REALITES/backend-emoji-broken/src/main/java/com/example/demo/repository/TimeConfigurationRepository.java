package com.example.demo.repository;

import com.example.demo.model.TimeConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TimeConfigurationRepository extends JpaRepository<TimeConfiguration, Long> {
    Optional<TimeConfiguration> findByWorldId(String worldId);
    Optional<TimeConfiguration> findByWorldIdAndZoneId(String worldId, String zoneId);
}