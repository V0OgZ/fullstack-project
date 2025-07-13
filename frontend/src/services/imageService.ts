import { ApiService } from './api';

export interface ImageUploadData {
  file: File;
  category: 'hero' | 'castle' | 'unit';
  faction?: string;
  unitType?: string;
  variant?: string;
  metadata?: {
    name: string;
    description: string;
    stats?: any;
  };
}

export interface ImageAsset {
  id: string;
  filename: string;
  category: 'hero' | 'castle' | 'unit';
  faction?: string;
  unitType?: string;
  variant?: string;
  url: string;
  metadata: {
    name: string;
    description: string;
    stats?: any;
  };
  uploadedAt: string;
}

export class ImageService {
  private static readonly SUPPORTED_FORMATS = ['image/png', 'image/jpeg', 'image/webp'];
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  /**
   * Upload a generated image to the server
   */
  static async uploadImage(uploadData: ImageUploadData): Promise<ImageAsset> {
    // Validate file
    if (!this.SUPPORTED_FORMATS.includes(uploadData.file.type)) {
      throw new Error(`Unsupported file format: ${uploadData.file.type}`);
    }
    
    if (uploadData.file.size > this.MAX_FILE_SIZE) {
      throw new Error('File size exceeds maximum limit of 5MB');
    }

    const formData = new FormData();
    formData.append('file', uploadData.file);
    formData.append('category', uploadData.category);
    
    if (uploadData.faction) formData.append('faction', uploadData.faction);
    if (uploadData.unitType) formData.append('unitType', uploadData.unitType);
    if (uploadData.variant) formData.append('variant', uploadData.variant);
    if (uploadData.metadata) formData.append('metadata', JSON.stringify(uploadData.metadata));

    try {
      const response = await fetch('http://localhost:8080/api/images/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  /**
   * Upload multiple images in batch
   */
  static async uploadImageBatch(files: File[], category: 'hero' | 'castle' | 'unit', faction?: string): Promise<ImageAsset[]> {
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    
    formData.append('category', category);
    if (faction) formData.append('faction', faction);

    try {
      const response = await fetch('http://localhost:8080/api/images/upload-batch', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Batch upload failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading image batch:', error);
      throw error;
    }
  }

  /**
   * Get all images
   */
  static async getImages(): Promise<ImageAsset[]> {
    try {
      const response = await fetch('http://localhost:8080/api/images');
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }

  /**
   * Get images by category
   */
  static async getImagesByCategory(category: 'hero' | 'castle' | 'unit'): Promise<ImageAsset[]> {
    try {
      const response = await fetch(`http://localhost:8080/api/images/category/${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} images: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${category} images:`, error);
      return [];
    }
  }

  /**
   * Get images by faction
   */
  static async getImagesByFaction(faction: string): Promise<ImageAsset[]> {
    try {
      const response = await fetch(`http://localhost:8080/api/images/faction/${faction}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${faction} images: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${faction} images:`, error);
      return [];
    }
  }

  /**
   * Delete an image
   */
  static async deleteImage(imageId: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:8080/api/images/${imageId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  /**
   * Update image metadata
   */
  static async updateImageMetadata(imageId: string, metadata: any): Promise<ImageAsset> {
    try {
      const response = await fetch(`http://localhost:8080/api/images/${imageId}/metadata`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metadata)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update metadata: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating image metadata:', error);
      throw error;
    }
  }

  /**
   * Get missing assets report
   */
  static async getMissingAssetsReport(): Promise<any> {
    try {
      const response = await fetch('http://localhost:8080/api/images/missing-assets');
      if (!response.ok) {
        throw new Error(`Failed to get missing assets report: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting missing assets report:', error);
      return {};
    }
  }

  /**
   * Get image statistics
   */
  static async getImageStatistics(): Promise<any> {
    try {
      const response = await fetch('http://localhost:8080/api/images/statistics');
      if (!response.ok) {
        throw new Error(`Failed to get image statistics: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting image statistics:', error);
      return {};
    }
  }

  /**
   * Process AI-generated image from URL
   */
  static async processAIGeneratedImage(imageUrl: string, category: string, faction: string, unitType?: string, variant?: string, metadata?: any): Promise<ImageAsset> {
    try {
      const response = await fetch('http://localhost:8080/api/images/process-ai-generated', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageUrl,
          category,
          faction,
          unitType,
          variant,
          metadata
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to process AI image: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error processing AI generated image:', error);
      throw error;
    }
  }

  /**
   * Process multiple AI-generated images
   */
  static async processAIGeneratedImageBatch(requests: any[]): Promise<ImageAsset[]> {
    try {
      const response = await fetch('http://localhost:8080/api/images/process-ai-generated-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requests })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to process AI image batch: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error processing AI generated image batch:', error);
      throw error;
    }
  }
}

/**
 * Utility functions for asset path management
 */
export class AssetPathUtils {
  /**
   * Generate standardized asset filename
   */
  static generateAssetFilename(category: string, faction: string, unitType?: string, variant?: string): string {
    let filename = `${category}_${faction}`;
    
    if (unitType) {
      filename += `_${unitType}`;
    }
    
    if (variant && variant !== 'basic') {
      filename += `_${variant}`;
    }
    
    return filename.toLowerCase().replace(/\s+/g, '_');
  }

  /**
   * Get asset URL for a given asset
   */
  static getAssetUrl(asset: ImageAsset): string {
    return asset.url || `/uploads/images/${asset.filename}`;
  }

  /**
   * Validate asset requirements
   */
  static validateAssetRequirements(category: string, metadata?: any): boolean {
    switch (category) {
      case 'hero':
        return metadata?.class && metadata?.faction;
      case 'castle':
        return metadata?.faction;
      case 'unit':
        return metadata?.faction && metadata?.unitType;
      default:
        return false;
    }
  }

  /**
   * Get expected asset paths for missing assets
   */
  static getExpectedAssetPaths(): { category: string; faction?: string; unitType?: string; path: string }[] {
    const expectedAssets: { category: string; faction?: string; unitType?: string; path: string }[] = [];
    
    // Heroes
    const heroFactions = ['castle', 'rampart', 'tower', 'inferno', 'necropolis', 'dungeon', 'stronghold', 'fortress'];
    const heroClasses = ['warrior', 'mage', 'archer'];
    
    heroFactions.forEach(faction => {
      heroClasses.forEach(heroClass => {
        expectedAssets.push({
          category: 'hero',
          faction,
          unitType: heroClass,
          path: `/assets/heroes/${faction}_${heroClass}.png`
        });
      });
    });
    
    // Castles
    heroFactions.forEach(faction => {
      expectedAssets.push({
        category: 'castle',
        faction,
        path: `/assets/castles/${faction}_castle.png`
      });
    });
    
    return expectedAssets;
  }
} 