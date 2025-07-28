package com.example.demo.controller;

import com.example.demo.model.ImageAsset;
import com.example.demo.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "*")
public class ImageController {
    
    @Autowired
    private ImageService imageService;
    
    /**
     * Upload a single image
     */
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category,
            @RequestParam(value = "faction", required = false) String faction,
            @RequestParam(value = "unitType", required = false) String unitType,
            @RequestParam(value = "variant", required = false) String variant,
            @RequestParam(value = "metadata", required = false) String metadata) {
        
        try {
            ImageAsset imageAsset = imageService.uploadImage(file, category, faction, unitType, variant, metadata);
            return ResponseEntity.ok(imageAsset);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to upload image: " + e.getMessage()));
        }
    }
    
    /**
     * Upload multiple images
     */
    @PostMapping("/upload/batch")
    public ResponseEntity<?> uploadImageBatch(@RequestParam("files") MultipartFile[] files,
                                            @RequestParam("category") String category,
                                            @RequestParam(value = "faction", required = false) String faction) {
        try {
            List<ImageAsset> imageAssets = imageService.uploadImageBatch(files, category, faction);
            return ResponseEntity.ok(imageAssets);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to upload images: " + e.getMessage()));
        }
    }
    
    /**
     * Get all images
     */
    @GetMapping
    public ResponseEntity<List<ImageAsset>> getAllImages() {
        try {
            List<ImageAsset> images = imageService.getAllImages();
            return ResponseEntity.ok(images);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get images by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ImageAsset>> getImagesByCategory(@PathVariable String category) {
        try {
            List<ImageAsset> images = imageService.getImagesByCategory(category);
            return ResponseEntity.ok(images);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get images by faction
     */
    @GetMapping("/faction/{faction}")
    public ResponseEntity<List<ImageAsset>> getImagesByFaction(@PathVariable String faction) {
        try {
            List<ImageAsset> images = imageService.getImagesByFaction(faction);
            return ResponseEntity.ok(images);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Get image by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ImageAsset> getImageById(@PathVariable String id) {
        try {
            ImageAsset image = imageService.getImageById(id);
            if (image != null) {
                return ResponseEntity.ok(image);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Update image metadata
     */
    @PutMapping("/{id}/metadata")
    public ResponseEntity<?> updateImageMetadata(@PathVariable String id, @RequestBody Map<String, Object> metadata) {
        try {
            ImageAsset updatedImage = imageService.updateImageMetadata(id, metadata);
            if (updatedImage != null) {
                return ResponseEntity.ok(updatedImage);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to update metadata: " + e.getMessage()));
        }
    }
    
    /**
     * Delete image
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable String id) {
        try {
            boolean deleted = imageService.deleteImage(id);
            if (deleted) {
                return ResponseEntity.ok(Map.of("message", "Image deleted successfully"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete image: " + e.getMessage()));
        }
    }
    
    /**
     * Get missing assets report
     */
    @GetMapping("/missing-assets")
    public ResponseEntity<?> getMissingAssets() {
        try {
            Map<String, Object> missingAssets = imageService.getMissingAssetsReport();
            return ResponseEntity.ok(missingAssets);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to generate missing assets report: " + e.getMessage()));
        }
    }
    
    /**
     * Get image statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getImageStats() {
        try {
            Map<String, Object> stats = imageService.getImageStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to get image statistics: " + e.getMessage()));
        }
    }
    
    /**
     * Process AI-generated image from URL
     */
    @PostMapping("/ai-generated")
    public ResponseEntity<?> processAIGeneratedImage(@RequestBody Map<String, Object> request) {
        try {
            String imageUrl = (String) request.get("url");
            String category = (String) request.get("category");
            String faction = (String) request.get("faction");
            String unitType = (String) request.get("unitType");
            String variant = (String) request.get("variant");
            @SuppressWarnings("unchecked")
            Map<String, Object> metadata = (Map<String, Object>) request.get("metadata");
            
            ImageAsset imageAsset = imageService.processAIGeneratedImage(imageUrl, category, faction, unitType, variant, metadata);
            return ResponseEntity.ok(imageAsset);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to process AI-generated image: " + e.getMessage()));
        }
    }
    
    /**
     * Process multiple AI-generated images
     */
    @PostMapping("/ai-generated/batch")
    public ResponseEntity<?> processAIGeneratedImageBatch(@RequestBody List<Map<String, Object>> requests) {
        try {
            List<ImageAsset> imageAssets = imageService.processAIGeneratedImageBatch(requests);
            return ResponseEntity.ok(imageAssets);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to process AI-generated images: " + e.getMessage()));
        }
    }
} 