package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.City;
import com.heroesoftimepoc.temporalengine.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Service pour la gestion des villes
 * Remplace les mocks par de vraies données
 */
@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    /**
     * Récupérer les données de ville
     */
    public Map<String, Object> getCityData() {
        // Récupérer la ville depuis la base de données ou créer une par défaut
        City city = cityRepository.findFirstByOrderByIdAsc()
                .orElseGet(this::createDefaultCity);

        Map<String, Object> cityData = new HashMap<>();
        cityData.put("name", city.getName());
        cityData.put("level", city.getLevel());
        cityData.put("resources", city.getResources());
        cityData.put("buildings", city.getBuildings());
        cityData.put("income", city.getIncome());

        return cityData;
    }

    /**
     * Sauvegarder les données de ville
     */
    public void saveCityData(Map<String, Object> cityData) {
        City city = cityRepository.findFirstByOrderByIdAsc()
                .orElse(new City());

        city.setName((String) cityData.get("name"));
        city.setLevel((Integer) cityData.get("level"));
        city.setResources((Map<String, Object>) cityData.get("resources"));
        city.setBuildings((Map<String, Object>) cityData.get("buildings"));
        city.setIncome((Map<String, Object>) cityData.get("income"));

        cityRepository.save(city);
    }

    /**
     * Mettre à jour les ressources
     */
    public Map<String, Object> updateResources(Map<String, Object> resources) {
        City city = cityRepository.findFirstByOrderByIdAsc()
                .orElseGet(this::createDefaultCity);

        city.setResources(resources);
        cityRepository.save(city);

        return city.getResources();
    }

    /**
     * Améliorer un bâtiment
     */
    public Map<String, Object> upgradeBuilding(String buildingType) {
        City city = cityRepository.findFirstByOrderByIdAsc()
                .orElseGet(this::createDefaultCity);

        Map<String, Object> buildings = city.getBuildings();
        Map<String, Object> building = (Map<String, Object>) buildings.get(buildingType);

        if (building != null) {
            int currentLevel = (Integer) building.get("level");
            int maxLevel = (Integer) building.get("maxLevel");

            if (currentLevel < maxLevel) {
                building.put("level", currentLevel + 1);
                city.setBuildings(buildings);
                cityRepository.save(city);

                // Recalculer les revenus
                recalculateIncome(city);
                cityRepository.save(city);
            }
        }

        return Map.of(
            "success", true,
            "building", buildingType,
            "newLevel", building.get("level"),
            "message", "Bâtiment amélioré"
        );
    }

    /**
     * Collecter les revenus
     */
    public Map<String, Object> collectIncome() {
        City city = cityRepository.findFirstByOrderByIdAsc()
                .orElseGet(this::createDefaultCity);

        Map<String, Object> resources = city.getResources();
        Map<String, Object> income = city.getIncome();

        // Ajouter les revenus aux ressources
        for (String resourceType : income.keySet()) {
            int currentAmount = (Integer) resources.get(resourceType);
            int incomeAmount = (Integer) income.get(resourceType);
            resources.put(resourceType, currentAmount + incomeAmount);
        }

        city.setResources(resources);
        cityRepository.save(city);

        return Map.of(
            "success", true,
            "resources", resources,
            "income", income,
            "message", "Revenus collectés"
        );
    }

    /**
     * Créer une ville par défaut
     */
    private City createDefaultCity() {
        City city = new City();
        city.setName("Ville d'Arthur");
        city.setLevel(1);

        // Ressources par défaut
        Map<String, Object> resources = new HashMap<>();
        resources.put("gold", 1000);
        resources.put("wood", 500);
        resources.put("stone", 300);
        resources.put("mana", 100);
        city.setResources(resources);

        // Bâtiments par défaut
        Map<String, Object> buildings = new HashMap<>();
        buildings.put("townHall", Map.of(
            "level", 1,
            "maxLevel", 5,
            "cost", Map.of("gold", 200, "wood", 100, "stone", 50)
        ));
        buildings.put("barracks", Map.of(
            "level", 0,
            "maxLevel", 3,
            "cost", Map.of("gold", 150, "wood", 80, "stone", 40)
        ));
        buildings.put("tower", Map.of(
            "level", 0,
            "maxLevel", 3,
            "cost", Map.of("gold", 120, "wood", 60, "stone", 30)
        ));
        buildings.put("mageTower", Map.of(
            "level", 0,
            "maxLevel", 2,
            "cost", Map.of("gold", 300, "wood", 150, "stone", 100)
        ));
        city.setBuildings(buildings);

        // Revenus par défaut
        Map<String, Object> income = new HashMap<>();
        income.put("gold", 50);
        income.put("wood", 20);
        income.put("stone", 10);
        income.put("mana", 5);
        city.setIncome(income);

        return cityRepository.save(city);
    }

    /**
     * Recalculer les revenus basés sur les niveaux des bâtiments
     */
    private void recalculateIncome(City city) {
        Map<String, Object> buildings = city.getBuildings();
        Map<String, Object> income = new HashMap<>();

        // Revenus de base
        income.put("gold", 50);
        income.put("wood", 20);
        income.put("stone", 10);
        income.put("mana", 5);

        // Bonus de l'Hôtel de Ville
        Map<String, Object> townHall = (Map<String, Object>) buildings.get("townHall");
        if (townHall != null) {
            int level = (Integer) townHall.get("level");
            int goldBonus = level * 10;
            income.put("gold", (Integer) income.get("gold") + goldBonus);
        }

        // Bonus de la Tour des Mages
        Map<String, Object> mageTower = (Map<String, Object>) buildings.get("mageTower");
        if (mageTower != null) {
            int level = (Integer) mageTower.get("level");
            int manaBonus = level * 5;
            income.put("mana", (Integer) income.get("mana") + manaBonus);
        }

        city.setIncome(income);
    }
} 