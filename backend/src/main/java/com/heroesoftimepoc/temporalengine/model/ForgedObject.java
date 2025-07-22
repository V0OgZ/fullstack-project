package com.heroesoftimepoc.temporalengine.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Objet forgé par la Forge Runique via grammaire HOTS
 */
@Entity
@Table(name = "forged_objects")
public class ForgedObject {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String type;  // WEAPON, ARTIFACT, ITEM, META_ARTIFACT, etc.
    
    @Column(length = 1000)
    private String formula;  // Formule GROFI utilisée
    
    @Column(length = 500)
    private String effect;  // Effet gameplay
    
    private String cost;  // Coût de création
    
    @Column(name = "forged_by")
    private String forgedBy;  // Nom du héros forgeron
    
    @Column(name = "forge_time")
    private LocalDateTime forgeTime;
    
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;
    
    @Column(name = "is_dangerous")
    private boolean isDangerous;
    
    @Column(name = "times_used")
    private int timesUsed;
    
    @Column(name = "stability_rating")
    private double stabilityRating;  // 0.0 = très instable, 1.0 = stable
    
    // Constructeur
    public ForgedObject() {
        this.forgeTime = LocalDateTime.now();
        this.timesUsed = 0;
        this.stabilityRating = 1.0;
        this.isDangerous = false;
    }
    
    // Méthodes métier
    public boolean hasMetaEffect() {
        return "META_ARTIFACT".equals(type) || 
               (effect != null && effect.contains("META"));
    }
    
    public boolean isUnstable() {
        return stabilityRating < 0.5;
    }
    
    public void use() {
        timesUsed++;
        // Chaque utilisation réduit la stabilité
        stabilityRating *= 0.95;
        
        if (isUnstable() && Math.random() < 0.1) {
            // 10% chance d'explosion si instable
            throw new RuntimeException("💥 L'objet forgé explose !");
        }
    }
    
    // Getters et Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getFormula() {
        return formula;
    }
    
    public void setFormula(String formula) {
        this.formula = formula;
        // Les formules complexes sont moins stables
        if (formula != null && formula.length() > 100) {
            this.stabilityRating *= 0.8;
        }
    }
    
    public String getEffect() {
        return effect;
    }
    
    public void setEffect(String effect) {
        this.effect = effect;
        // Les effets méta sont dangereux
        if (effect != null && effect.contains("EXECUTE")) {
            this.isDangerous = true;
        }
    }
    
    public String getCost() {
        return cost;
    }
    
    public void setCost(String cost) {
        this.cost = cost;
    }
    
    public String getForgedBy() {
        return forgedBy;
    }
    
    public void setForgedBy(String forgedBy) {
        this.forgedBy = forgedBy;
    }
    
    public LocalDateTime getForgeTime() {
        return forgeTime;
    }
    
    public void setForgeTime(LocalDateTime forgeTime) {
        this.forgeTime = forgeTime;
    }
    
    public Game getGame() {
        return game;
    }
    
    public void setGame(Game game) {
        this.game = game;
    }
    
    public boolean isDangerous() {
        return isDangerous;
    }
    
    public void setDangerous(boolean dangerous) {
        isDangerous = dangerous;
    }
    
    public int getTimesUsed() {
        return timesUsed;
    }
    
    public void setTimesUsed(int timesUsed) {
        this.timesUsed = timesUsed;
    }
    
    public double getStabilityRating() {
        return stabilityRating;
    }
    
    public void setStabilityRating(double stabilityRating) {
        this.stabilityRating = stabilityRating;
    }
    
    // Méthodes pour compatibilité API
    public int getPower() {
        // Calculer la puissance basée sur la stabilité et les utilisations
        return (int) (stabilityRating * 100) + (timesUsed * 10);
    }
    
    public String getDescription() {
        return effect != null ? effect : "Objet forgé par " + forgedBy;
    }
    
    public String getRisks() {
        if (isDangerous) {
            return "HAUT - Peut causer des dommages au serveur";
        } else if (isUnstable()) {
            return "MOYEN - Instable, peut exploser";
        } else {
            return "FAIBLE - Stable et sûr";
        }
    }
    
    public LocalDateTime getCreatedAt() {
        return forgeTime;
    }
    
    @Override
    public String toString() {
        return String.format("ForgedObject{name='%s', type='%s', forgedBy='%s', stability=%.2f}",
            name, type, forgedBy, stabilityRating);
    }
} 