package com.example.demo.service;

import com.example.demo.model.ImageAsset;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ImageService {
    
    private final String UPLOAD_DIR = "uploads/images/";
    private final List<ImageAsset> images = new ArrayList<>(); // In-memory storage for now
    
    public ImageService() {
        // Create upload directory if it doesn't exist
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
        } catch (IOException e) {
            System.err.println("Failed to create upload directory: " + e.getMessage());
        }
    }
    
    public ImageAsset uploadImage(MultipartFile file, String category, String faction, 
                                 String unitType, String variant, String metadata) throws IOException {
        
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null ? 
            originalFilename.substring(originalFilename.lastIndexOf('.')) : ".png";
        String filename = generateFilename(category, faction, unitType, variant) + extension;
        
        // Save file
        Path filePath = Paths.get(UPLOAD_DIR + filename);
        Files.write(filePath, file.getBytes());
        
        // Create ImageAsset
        ImageAsset imageAsset = new ImageAsset();
        imageAsset.setAssetId(UUID.randomUUID().toString());
        imageAsset.setFilename(filename);
        imageAsset.setOriginalFilename(originalFilename);
        imageAsset.setCategory(category);
        imageAsset.setFaction(faction);
        imageAsset.setUnitType(unitType);
        imageAsset.setVariant(variant);
        imageAsset.setFilePath(UPLOAD_DIR);
        imageAsset.setUrl("/uploads/images/" + filename);
        imageAsset.setFileSize(file.getSize());
        imageAsset.setMimeType(file.getContentType());
        imageAsset.setUploadedAt(LocalDateTime.now());
        imageAsset.setIsActive(true);
        imageAsset.setIsAiGenerated(false);
        
        // Parse metadata if provided
        if (metadata != null && !metadata.isEmpty()) {
            // Simple JSON parsing for metadata
            Map<String, String> metadataMap = new HashMap<>();
            metadataMap.put("description", metadata);
            imageAsset.setMetadata(metadataMap);
        }
        
        // Store in memory (in production, save to database)
        images.add(imageAsset);
        
        return imageAsset;
    }
    
    public List<ImageAsset> uploadImageBatch(MultipartFile[] files, String category, String faction) throws IOException {
        List<ImageAsset> uploadedImages = new ArrayList<>();
        
        for (MultipartFile file : files) {
            ImageAsset imageAsset = uploadImage(file, category, faction, null, "basic", null);
            uploadedImages.add(imageAsset);
        }
        
        return uploadedImages;
    }
    
    public List<ImageAsset> getAllImages() {
        return new ArrayList<>(images);
    }
    
    public List<ImageAsset> getImagesByCategory(String category) {
        return images.stream()
                .filter(img -> category.equals(img.getCategory()))
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }
    
    public List<ImageAsset> getImagesByFaction(String faction) {
        return images.stream()
                .filter(img -> faction.equals(img.getFaction()))
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }
    
    public ImageAsset getImageById(String id) {
        return images.stream()
                .filter(img -> id.equals(img.getAssetId()))
                .findFirst()
                .orElse(null);
    }
    
    public ImageAsset updateImageMetadata(String id, Map<String, Object> metadata) {
        ImageAsset image = getImageById(id);
        if (image != null) {
            Map<String, String> metadataMap = new HashMap<>();
            metadata.forEach((key, value) -> metadataMap.put(key, value.toString()));
            image.setMetadata(metadataMap);
            image.updateTimestamp();
        }
        return image;
    }
    
    public boolean deleteImage(String id) {
        ImageAsset image = getImageById(id);
        if (image != null) {
            // Delete file from filesystem
            try {
                Path filePath = Paths.get(image.getFilePath() + image.getFilename());
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                System.err.println("Failed to delete file: " + e.getMessage());
            }
            
            // Remove from memory
            images.removeIf(img -> id.equals(img.getAssetId()));
            return true;
        }
        return false;
    }
    
    public Map<String, Object> getMissingAssetsReport() {
        Map<String, Object> report = new HashMap<>();
        
        // Count images by category
        Map<String, Long> categoryCount = new HashMap<>();
        images.forEach(img -> categoryCount.merge(img.getCategory(), 1L, Long::sum));
        
        report.put("totalImages", images.size());
        report.put("categoryCount", categoryCount);
        
        // Expected assets (simplified)
        List<String> expectedHeroes = Arrays.asList(
            "warrior_castle", "mage_castle", "archer_castle",
            "druid_rampart", "ranger_rampart", "beastmaster_rampart",
            "wizard_tower", "alchemist_tower",
            "demoniac_inferno", "heretic_inferno"
        );
        
        List<String> expectedCastles = Arrays.asList(
            "castle", "rampart", "tower", "inferno", 
            "necropolis", "dungeon", "stronghold", "fortress"
        );
        
        // Check missing assets
        List<String> missingHeroes = new ArrayList<>();
        for (String hero : expectedHeroes) {
            boolean exists = images.stream()
                    .anyMatch(img -> "hero".equals(img.getCategory()) && 
                                   img.getFilename().contains(hero));
            if (!exists) {
                missingHeroes.add(hero);
            }
        }
        
        List<String> missingCastles = new ArrayList<>();
        for (String castle : expectedCastles) {
            boolean exists = images.stream()
                    .anyMatch(img -> "castle".equals(img.getCategory()) && 
                                   castle.equals(img.getFaction()));
            if (!exists) {
                missingCastles.add(castle);
            }
        }
        
        report.put("missingHeroes", missingHeroes);
        report.put("missingCastles", missingCastles);
        
        return report;
    }
    
    public Map<String, Object> getImageStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalImages", images.size());
        stats.put("heroCount", images.stream().filter(img -> "hero".equals(img.getCategory())).count());
        stats.put("castleCount", images.stream().filter(img -> "castle".equals(img.getCategory())).count());
        stats.put("unitCount", images.stream().filter(img -> "unit".equals(img.getCategory())).count());
        
        return stats;
    }
    
    public ImageAsset processAIGeneratedImage(String imageUrl, String category, String faction, 
                                            String unitType, String variant, Map<String, Object> metadata) {
        // For now, just create a placeholder ImageAsset
        // In production, you would download the image from the URL
        
        ImageAsset imageAsset = new ImageAsset();
        imageAsset.setAssetId(UUID.randomUUID().toString());
        imageAsset.setFilename(generateFilename(category, faction, unitType, variant) + ".png");
        imageAsset.setCategory(category);
        imageAsset.setFaction(faction);
        imageAsset.setUnitType(unitType);
        imageAsset.setVariant(variant);
        imageAsset.setUrl(imageUrl);
        imageAsset.setUploadedAt(LocalDateTime.now());
        imageAsset.setIsActive(true);
        imageAsset.setIsAiGenerated(true);
        imageAsset.setAiPrompt("AI generated image");
        
        if (metadata != null) {
            Map<String, String> metadataMap = new HashMap<>();
            metadata.forEach((key, value) -> metadataMap.put(key, value.toString()));
            imageAsset.setMetadata(metadataMap);
        }
        
        images.add(imageAsset);
        return imageAsset;
    }
    
    public List<ImageAsset> processAIGeneratedImageBatch(List<Map<String, Object>> requests) {
        List<ImageAsset> processedImages = new ArrayList<>();
        
        for (Map<String, Object> request : requests) {
            String imageUrl = (String) request.get("url");
            String category = (String) request.get("category");
            String faction = (String) request.get("faction");
            String unitType = (String) request.get("unitType");
            String variant = (String) request.get("variant");
            @SuppressWarnings("unchecked")
            Map<String, Object> metadata = (Map<String, Object>) request.get("metadata");
            
            ImageAsset imageAsset = processAIGeneratedImage(imageUrl, category, faction, unitType, variant, metadata);
            processedImages.add(imageAsset);
        }
        
        return processedImages;
    }
    
    private String generateFilename(String category, String faction, String unitType, String variant) {
        StringBuilder filename = new StringBuilder();
        
        if (category != null) {
            filename.append(category);
        }
        
        if (faction != null) {
            if (filename.length() > 0) filename.append("_");
            filename.append(faction);
        }
        
        if (unitType != null) {
            if (filename.length() > 0) filename.append("_");
            filename.append(unitType);
        }
        
        if (variant != null && !"basic".equals(variant)) {
            if (filename.length() > 0) filename.append("_");
            filename.append(variant);
        }
        
        // Add timestamp to avoid conflicts
        filename.append("_").append(System.currentTimeMillis());
        
        return filename.toString();
    }
} 