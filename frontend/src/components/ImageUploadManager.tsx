import React, { useState, useEffect, useCallback } from 'react';
import { ImageService, ImageAsset, ImageUploadData, AssetPathUtils } from '../services/imageService';
import { CASTLE_TYPES } from '../types/castle';
import './ImageUploadManager.css';

interface ImageUploadManagerProps {
  onImagesUploaded?: (images: ImageAsset[]) => void;
}

const ImageUploadManager: React.FC<ImageUploadManagerProps> = ({ onImagesUploaded }) => {
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'hero' | 'castle' | 'unit'>('hero');
  const [selectedFaction, setSelectedFaction] = useState<string>('castle');
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [missingAssets, setMissingAssets] = useState<{
    heroes: Array<{ path: string; faction: string; class: string }>;
    castles: Array<{ path: string; faction: string }>;
  }>({ heroes: [], castles: [] });

  const factions = Object.keys(CASTLE_TYPES);
  const heroClasses = {
    castle: ['warrior', 'mage', 'archer'],
    rampart: ['druid', 'ranger', 'beastmaster'],
    tower: ['wizard', 'alchemist'],
    inferno: ['demoniac', 'heretic'],
    necropolis: ['necromancer', 'death_knight'],
    dungeon: ['overlord', 'warlock'],
    stronghold: ['barbarian', 'battle_mage'],
    fortress: ['beastmaster', 'witch']
  };

  // Load existing images and check for missing assets
  useEffect(() => {
    loadImages();
    checkMissingAssets();
  }, []);

  const loadImages = async () => {
    try {
      const allImages = await ImageService.getImages();
      setImages(allImages);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const checkMissingAssets = async () => {
    try {
      const missing = await ImageService.getMissingAssetsReport();
      setMissingAssets({
        heroes: missing.missingHeroes || [],
        castles: missing.missingCastles || []
      });
    } catch (error) {
      console.error('Error checking missing assets:', error);
    }
  };

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files) return;

    setLoading(true);
    const uploadData: ImageUploadData[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name.toLowerCase();
      
      // Parse filename to extract metadata
      let category: 'hero' | 'castle' | 'unit' = selectedCategory;
      let faction = selectedFaction;
      let unitType = '';
      let variant = 'basic';
      let metadata = { name: '', description: '' };

      // Try to parse filename for automatic categorization
      if (fileName.includes('_castle') || fileName.includes('_rampart') || fileName.includes('_tower')) {
        const parts = fileName.replace('.png', '').split('_');
        if (parts.length >= 2) {
          const factionPart = parts[parts.length - 1];
          if (factions.includes(factionPart)) {
            faction = factionPart;
            const namePart = parts.slice(0, -1).join('_');
            
            if (heroClasses[faction as keyof typeof heroClasses]?.includes(namePart)) {
              category = 'hero';
              metadata.name = `${namePart.charAt(0).toUpperCase() + namePart.slice(1)} (${CASTLE_TYPES[faction as keyof typeof CASTLE_TYPES].name})`;
            } else if (fileName.includes('castle') || fileName.includes('rampart')) {
              category = 'castle';
              metadata.name = CASTLE_TYPES[faction as keyof typeof CASTLE_TYPES].name;
            }
          }
        }
      }

      uploadData.push({
        file,
        category,
        faction,
        unitType,
        variant,
        metadata
      });
    }

    try {
      const uploadPromises = uploadData.map(data => ImageService.uploadImage(data));
      const uploadedImages = await Promise.all(uploadPromises);
      setImages(prev => [...prev, ...uploadedImages]);
      await checkMissingAssets(); // Refresh missing assets
      
      if (onImagesUploaded) {
        onImagesUploaded(uploadedImages);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedFaction, factions, onImagesUploaded]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await ImageService.deleteImage(imageId);
      setImages(prev => prev.filter(img => img.id !== imageId));
      await checkMissingAssets(); // Refresh missing assets
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const filteredImages = images.filter(img => {
    if (selectedCategory && img.category !== selectedCategory) return false;
    if (selectedFaction && img.faction !== selectedFaction) return false;
    return true;
  });

  const getMissingAssetsForCurrentSelection = () => {
    if (selectedCategory === 'hero') {
      return missingAssets.heroes.filter(hero => hero.faction === selectedFaction);
    } else if (selectedCategory === 'castle') {
      return missingAssets.castles.filter(castle => castle.faction === selectedFaction);
    }
    return [];
  };

  return (
    <div className="image-upload-manager">
      <div className="upload-header">
        <h2>🎨 Image Upload Manager</h2>
        <p>Upload and manage generated images for Heroes of Time</p>
      </div>

      {/* Upload Controls */}
      <div className="upload-controls">
        <div className="control-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value as 'hero' | 'castle' | 'unit')}
          >
            <option value="hero">Heroes</option>
            <option value="castle">Castles</option>
            <option value="unit">Units</option>
          </select>
        </div>

        <div className="control-group">
          <label>Faction:</label>
          <select 
            value={selectedFaction} 
            onChange={(e) => setSelectedFaction(e.target.value)}
          >
            {factions.map(faction => (
              <option key={faction} value={faction}>
                {CASTLE_TYPES[faction as keyof typeof CASTLE_TYPES].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Upload Area */}
      <div 
        className={`upload-area ${loading ? 'loading' : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <div className="upload-icon">📁</div>
          <p>Drag & drop images here or click to select</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input" className="upload-button">
            Choose Files
          </label>
        </div>
        {loading && (
          <div className="upload-loading">
            <div className="spinner"></div>
            <p>Uploading images...</p>
          </div>
        )}
      </div>

      {/* Missing Assets Alert */}
      {getMissingAssetsForCurrentSelection().length > 0 && (
        <div className="missing-assets-alert">
          <h3>⚠️ Missing Assets for {CASTLE_TYPES[selectedFaction as keyof typeof CASTLE_TYPES].name}</h3>
          <div className="missing-list">
            {getMissingAssetsForCurrentSelection().map((asset, index) => (
              <div key={index} className="missing-item">
                <span className="missing-name">
                  {selectedCategory === 'hero' && 'class' in asset 
                    ? (asset as { path: string; faction: string; class: string }).class 
                    : (asset as { path: string; faction: string }).faction}
                </span>
                <span className="missing-path">{asset.path}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="gallery-header">
          <h3>
            {selectedCategory === 'hero' ? '⚔️' : selectedCategory === 'castle' ? '🏰' : '👥'} 
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s - 
            {CASTLE_TYPES[selectedFaction as keyof typeof CASTLE_TYPES].name}
          </h3>
          <span className="image-count">({filteredImages.length} images)</span>
        </div>

        <div className="gallery-grid">
          {filteredImages.map(image => (
            <div key={image.id} className="image-card">
              <div className="image-container">
                <img 
                  src={image.url} 
                  alt={image.metadata.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/placeholder.png';
                  }}
                />
                <div className="image-overlay">
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteImage(image.id)}
                    title="Delete image"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="image-info">
                <h4>{image.metadata.name}</h4>
                <p className="image-category">{image.category}</p>
                <p className="image-faction">{image.faction}</p>
                {image.metadata.description && (
                  <p className="image-description">{image.metadata.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="empty-gallery">
            <div className="empty-icon">🖼️</div>
            <p>No images uploaded yet for this category and faction.</p>
            <p>Upload some images to get started!</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="upload-stats">
        <div className="stat-item">
          <span className="stat-label">Total Images:</span>
          <span className="stat-value">{images.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Heroes:</span>
          <span className="stat-value">{images.filter(img => img.category === 'hero').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Castles:</span>
          <span className="stat-value">{images.filter(img => img.category === 'castle').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Units:</span>
          <span className="stat-value">{images.filter(img => img.category === 'unit').length}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadManager; 