package com.heroesoftimepoc.temporalengine.repository;

import com.heroesoftimepoc.temporalengine.model.*;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Repository pour les objets légendaires
 * Version simplifiée sans JPA pour la compilation
 */
@Repository
public class LegendaryObjectRepository {
    
    private final Map<Long, LegendaryObject> objects = new HashMap<>();
    private Long nextId = 1L;
    
    public LegendaryObject save(LegendaryObject object) {
        if (object.getId() == null) {
            object.setId(nextId++);
        }
        objects.put(object.getId(), object);
        return object;
    }
    
    public Optional<LegendaryObject> findById(Long id) {
        return Optional.ofNullable(objects.get(id));
    }
    
    public List<LegendaryObject> findAll() {
        return new ArrayList<>(objects.values());
    }
    
    public void deleteById(Long id) {
        objects.remove(id);
    }
    
    public LegendaryObject findByName(String name) {
        return objects.values().stream()
                .filter(obj -> Objects.equals(obj.getName(), name))
                .findFirst()
                .orElse(null);
    }
    
    public boolean existsByName(String name) {
        return findByName(name) != null;
    }
    
    public List<LegendaryObject> findByObjectType(LegendaryObjectType objectType) {
        return objects.values().stream()
                .filter(obj -> obj.getObjectType() == objectType)
                .collect(Collectors.toList());
    }
    
    public List<LegendaryObject> findByAffectsTimeline(boolean affectsTimeline) {
        return objects.values().stream()
                .filter(obj -> obj.isAffectsTimeline() == affectsTimeline)
                .collect(Collectors.toList());
    }
    
    public List<LegendaryObject> findByIsActive(boolean isActive) {
        return objects.values().stream()
                .filter(obj -> obj.isActive() == isActive)
                .collect(Collectors.toList());
    }
    
    public List<LegendaryObject> findByRequiresActivation(boolean requiresActivation) {
        return objects.values().stream()
                .filter(obj -> obj.isRequiresActivation() == requiresActivation)
                .collect(Collectors.toList());
    }
    
    public List<LegendaryObject> findByVisibilityMode(VisibilityMode visibilityMode) {
        return objects.values().stream()
                .filter(obj -> obj.getVisibilityMode() == visibilityMode)
                .collect(Collectors.toList());
    }
    
    public List<LegendaryObject> findByEffect(CausalityEffect effect) {
        return objects.values().stream()
                .filter(obj -> obj.hasEffect(effect))
                .collect(Collectors.toList());
    }
    
    public List<LegendaryObject> findByRadiusOfInfluenceGreaterThanEqual(Integer minRadius) {
        return objects.values().stream()
                .filter(obj -> obj.getRadiusOfInfluence() >= minRadius)
                .collect(Collectors.toList());
    }
    
    public List<LegendaryObject> findByStrengthGreaterThanEqual(Double minStrength) {
        return objects.values().stream()
                .filter(obj -> obj.getStrength() >= minStrength)
                .collect(Collectors.toList());
    }
    
    public List<LegendaryObject> findUsableObjects(Integer currentTurn) {
        return objects.values().stream()
                .filter(obj -> obj.canBeUsed(currentTurn))
                .collect(Collectors.toList());
    }
    
    public List<LegendaryObject> findObjectsOnCooldown(Integer currentTurn) {
        return objects.values().stream()
                .filter(obj -> obj.isActive() && !obj.canBeUsed(currentTurn))
                .collect(Collectors.toList());
    }
} 