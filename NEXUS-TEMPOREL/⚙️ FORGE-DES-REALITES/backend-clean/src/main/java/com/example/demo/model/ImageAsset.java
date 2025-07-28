package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "image_assets")
public class ImageAsset {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "asset_id", unique = true, nullable = false)
    private String assetId;
    
    @Column(name = "filename", nullable = false)
    private String filename;
    
    @Column(name = "original_filename")
    private String originalFilename;
    
    @Column(name = "category", nullable = false)
    private String category; // hero, castle, unit
    
    @Column(name = "faction")
    private String faction;
    
    @Column(name = "unit_type")
    private String unitType;
    
    @Column(name = "variant")
    private String variant;
    
    @Column(name = "file_path", nullable = false)
    private String filePath;
    
    @Column(name = "url", nullable = false)
    private String url;
    
    @Column(name = "file_size")
    private Long fileSize;
    
    @Column(name = "mime_type")
    private String mimeType;
    
    @Column(name = "width")
    private Integer width;
    
    @Column(name = "height")
    private Integer height;
    
    @ElementCollection
    @CollectionTable(name = "image_metadata", joinColumns = @JoinColumn(name = "image_id"))
    @MapKeyColumn(name = "metadata_key")
    @Column(name = "metadata_value")
    private Map<String, String> metadata;
    
    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
    
    @Column(name = "is_ai_generated")
    private Boolean isAiGenerated;
    
    @Column(name = "ai_prompt")
    private String aiPrompt;
    
    @Column(name = "tags")
    private String tags; // Comma-separated tags
    
    // Constructors
    public ImageAsset() {
        this.uploadedAt = LocalDateTime.now();
        this.isActive = true;
        this.isAiGenerated = false;
    }
    
    public ImageAsset(String assetId, String filename, String category, String filePath, String url) {
        this();
        this.assetId = assetId;
        this.filename = filename;
        this.category = category;
        this.filePath = filePath;
        this.url = url;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAssetId() {
        return assetId;
    }
    
    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }
    
    public String getFilename() {
        return filename;
    }
    
    public void setFilename(String filename) {
        this.filename = filename;
    }
    
    public String getOriginalFilename() {
        return originalFilename;
    }
    
    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getFaction() {
        return faction;
    }
    
    public void setFaction(String faction) {
        this.faction = faction;
    }
    
    public String getUnitType() {
        return unitType;
    }
    
    public void setUnitType(String unitType) {
        this.unitType = unitType;
    }
    
    public String getVariant() {
        return variant;
    }
    
    public void setVariant(String variant) {
        this.variant = variant;
    }
    
    public String getFilePath() {
        return filePath;
    }
    
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public Long getFileSize() {
        return fileSize;
    }
    
    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }
    
    public String getMimeType() {
        return mimeType;
    }
    
    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }
    
    public Integer getWidth() {
        return width;
    }
    
    public void setWidth(Integer width) {
        this.width = width;
    }
    
    public Integer getHeight() {
        return height;
    }
    
    public void setHeight(Integer height) {
        this.height = height;
    }
    
    public Map<String, String> getMetadata() {
        return metadata;
    }
    
    public void setMetadata(Map<String, String> metadata) {
        this.metadata = metadata;
    }
    
    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }
    
    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public Boolean getIsAiGenerated() {
        return isAiGenerated;
    }
    
    public void setIsAiGenerated(Boolean isAiGenerated) {
        this.isAiGenerated = isAiGenerated;
    }
    
    public String getAiPrompt() {
        return aiPrompt;
    }
    
    public void setAiPrompt(String aiPrompt) {
        this.aiPrompt = aiPrompt;
    }
    
    public String getTags() {
        return tags;
    }
    
    public void setTags(String tags) {
        this.tags = tags;
    }
    
    // Utility methods
    public void updateTimestamp() {
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getFullPath() {
        return this.filePath + "/" + this.filename;
    }
    
    public boolean isHero() {
        return "hero".equals(this.category);
    }
    
    public boolean isCastle() {
        return "castle".equals(this.category);
    }
    
    public boolean isUnit() {
        return "unit".equals(this.category);
    }
    
    @Override
    public String toString() {
        return "ImageAsset{" +
                "id=" + id +
                ", assetId='" + assetId + '\'' +
                ", filename='" + filename + '\'' +
                ", category='" + category + '\'' +
                ", faction='" + faction + '\'' +
                ", unitType='" + unitType + '\'' +
                ", variant='" + variant + '\'' +
                ", uploadedAt=" + uploadedAt +
                '}';
    }
} 