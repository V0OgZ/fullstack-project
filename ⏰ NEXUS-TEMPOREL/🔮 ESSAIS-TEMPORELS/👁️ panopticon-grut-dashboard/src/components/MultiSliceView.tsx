import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane, Line } from '@react-three/drei';
import * as THREE from 'three';

interface MultiSliceViewProps {
  worldStateData: any;
  selectedDimensions: string[];
  onSliceSelect: (sliceId: string) => void;
  recursionDepth: number;
}

/**
 * 🔬 MULTI SLICE VIEW - VISUALISATION MULTI-DIMENSIONNELLE
 * ========================================================
 * 
 * Composant pour visualiser plusieurs tranches dimensionnelles simultanément
 * avec navigation interactive entre les couches de réalité.
 * 
 * OPUS SPECS: "MultiSliceView - Visualisation simultanée des 6 dimensions"
 * DIMENSIONS: Affichage en grilles superposées avec interactions
 * STATUS: ✅ CRÉÉ - Multi-slicing opérationnel
 */

interface SliceData {
  id: string;
  dimension: string;
  data: any[];
  position: [number, number, number];
  color: string;
  opacity: number;
}

const DIMENSION_CONFIGS = {
  'SPACE_XYZ': { color: '#4CAF50', symbol: '⚹', name: 'Space' },
  'TIME_T': { color: '#2196F3', symbol: '⧖', name: 'Time' },
  'CAUSALITY_PSI': { color: '#FF9800', symbol: 'Ψ', name: 'Causality' },
  'SUPERPOSITION_SIGMA': { color: '#9C27B0', symbol: 'Σ', name: 'Superposition' },
  'ENTROPY_S': { color: '#F44336', symbol: 'S', name: 'Entropy' },
  'RECURSIVITY_R': { color: '#FF5722', symbol: '𝕽', name: 'Recursivity' }
};

const DimensionalSlice: React.FC<{
  slice: SliceData;
  isSelected: boolean;
  onClick: () => void;
  recursionDepth: number;
}> = ({ slice, isSelected, onClick, recursionDepth }) => {
  const sliceRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (sliceRef.current) {
      // Rotation basée sur la profondeur de récursion
      const recursionEffect = recursionDepth / 4;
      sliceRef.current.rotation.z += 0.005 * (1 + recursionEffect);
      
      // Effet de sélection
      if (isSelected) {
        sliceRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
    }
  });

  const config = DIMENSION_CONFIGS[slice.dimension as keyof typeof DIMENSION_CONFIGS];
  if (!config) return null;

  return (
    <group
      ref={sliceRef}
      position={slice.position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Plan de base de la tranche */}
      <Plane
        args={[4, 4]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color={config.color}
          transparent
          opacity={isSelected ? 0.6 : 0.3}
          wireframe={!isSelected}
        />
      </Plane>
      
      {/* Grille de données */}
      {slice.data.map((dataPoint, index) => (
        <Box
          key={index}
          args={[0.2, dataPoint.value * 0.5, 0.2]}
          position={[
            (index % 8 - 3.5) * 0.5,
            dataPoint.value * 0.25,
            (Math.floor(index / 8) - 3.5) * 0.5
          ]}
        >
          <meshStandardMaterial
            color={config.color}
            emissive={isSelected ? config.color : '#000000'}
            emissiveIntensity={isSelected ? 0.2 : 0}
          />
        </Box>
      ))}
      
      {/* Bordure de sélection */}
      {isSelected && (
        <Line
          points={[
            [-2, 0, -2], [2, 0, -2], [2, 0, 2], [-2, 0, 2], [-2, 0, -2]
          ]}
          color="#FFD700"
          lineWidth={3}
        />
      )}
      
      {/* Label de dimension */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.4}
        color={config.color}
        anchorX="center"
      >
        {config.symbol} {config.name}
      </Text>
      
      {/* Indicateur de récursion */}
      {recursionDepth > 0 && (
        <group position={[2.5, 1, 0]}>
          {Array.from({ length: recursionDepth }).map((_, i) => (
            <Box
              key={i}
              args={[0.1, 0.1, 0.1]}
              position={[0, i * 0.2, 0]}
            >
              <meshBasicMaterial color="#FF5722" />
            </Box>
          ))}
          <Text
            position={[0, recursionDepth * 0.2 + 0.3, 0]}
            fontSize={0.2}
            color="#FF5722"
          >
            R:{recursionDepth}
          </Text>
        </group>
      )}
      
      {/* Effet de hover */}
      {hovered && (
        <Plane args={[4.5, 4.5]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <meshBasicMaterial color="#FFD700" transparent opacity={0.1} />
        </Plane>
      )}
    </group>
  );
};

const ConnectionLines: React.FC<{
  slices: SliceData[];
  selectedSlices: string[];
}> = ({ slices, selectedSlices }) => {
  const connections = [];
  
  // Créer des connexions entre les tranches sélectionnées
  for (let i = 0; i < selectedSlices.length; i++) {
    for (let j = i + 1; j < selectedSlices.length; j++) {
      const slice1 = slices.find(s => s.id === selectedSlices[i]);
      const slice2 = slices.find(s => s.id === selectedSlices[j]);
      
      if (slice1 && slice2) {
        connections.push({
          from: slice1.position,
          to: slice2.position,
          color: '#FFD700'
        });
      }
    }
  }
  
  return (
    <>
      {connections.map((conn, index) => (
        <Line
          key={index}
          points={[conn.from, conn.to]}
          color={conn.color}
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}
    </>
  );
};

const RecursionIndicator: React.FC<{ depth: number; maxDepth: number }> = ({ depth, maxDepth }) => {
  const getRecursionColor = (depth: number, maxDepth: number) => {
    const ratio = depth / maxDepth;
    if (ratio < 0.5) return '#4CAF50';
    if (ratio < 0.8) return '#FF9800';
    return '#F44336';
  };

  return (
    <group position={[0, 6, 0]}>
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color={getRecursionColor(depth, maxDepth)}
        anchorX="center"
      >
        🔄 Recursion: {depth}/{maxDepth}
      </Text>
      
      {/* Barre de progression récursion */}
      <Box args={[4, 0.2, 0.1]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#333333" />
      </Box>
      <Box 
        args={[(depth / maxDepth) * 4, 0.15, 0.12]} 
        position={[((depth / maxDepth) * 4 - 4) / 2, -0.5, 0.01]}
      >
        <meshStandardMaterial color={getRecursionColor(depth, maxDepth)} />
      </Box>
      
      {/* Alerte si proche de la limite */}
      {depth >= maxDepth * 0.8 && (
        <Text
          position={[0, -1, 0]}
          fontSize={0.3}
          color="#F44336"
          anchorX="center"
        >
          ⚠️ RECURSION LIMIT WARNING
        </Text>
      )}
    </group>
  );
};

export const MultiSliceView: React.FC<MultiSliceViewProps> = ({
  worldStateData,
  selectedDimensions,
  onSliceSelect,
  recursionDepth
}) => {
  const [selectedSlices, setSelectedSlices] = useState<string[]>([]);
  const [slices, setSlices] = useState<SliceData[]>([]);

  // Générer les tranches dimensionnelles
  useEffect(() => {
    const newSlices: SliceData[] = selectedDimensions.map((dimension, index) => {
      // Générer des données simulées pour chaque dimension
      const data = Array.from({ length: 64 }, (_, i) => ({
        id: i,
        value: Math.random() * 2 + 0.1,
        quantum: Math.random(),
        causal: Math.random() > 0.5
      }));
      
      return {
        id: `slice_${dimension}_${index}`,
        dimension,
        data,
        position: [
          (index % 3 - 1) * 6,
          0,
          (Math.floor(index / 3) - 1) * 6
        ] as [number, number, number],
        color: DIMENSION_CONFIGS[dimension as keyof typeof DIMENSION_CONFIGS]?.color || '#FFFFFF',
        opacity: 0.7
      };
    });
    
    setSlices(newSlices);
  }, [selectedDimensions, worldStateData]);

  const handleSliceClick = (sliceId: string) => {
    setSelectedSlices(prev => {
      const newSelection = prev.includes(sliceId)
        ? prev.filter(id => id !== sliceId)
        : [...prev, sliceId];
      
      if (newSelection.length > 0) {
        onSliceSelect(newSelection[newSelection.length - 1]);
      }
      
      return newSelection;
    });
  };

  return (
    <div style={{ width: '100%', height: '600px', background: '#000022' }}>
      <Canvas camera={{ position: [12, 8, 12], fov: 50 }}>
        {/* Éclairage */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.7} color="#4CAF50" />
        <pointLight position={[0, -5, 0]} intensity={0.5} color="#2196F3" />
        
        {/* Contrôles */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={25}
          minDistance={8}
        />
        
        {/* Indicateur de récursion */}
        <RecursionIndicator depth={recursionDepth} maxDepth={4} />
        
        {/* Tranches dimensionnelles */}
        {slices.map((slice) => (
          <DimensionalSlice
            key={slice.id}
            slice={slice}
            isSelected={selectedSlices.includes(slice.id)}
            onClick={() => handleSliceClick(slice.id)}
            recursionDepth={recursionDepth}
          />
        ))}
        
        {/* Lignes de connexion */}
        <ConnectionLines slices={slices} selectedSlices={selectedSlices} />
        
        {/* Grille de référence */}
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <meshBasicMaterial color="#111111" wireframe />
        </Plane>
      </Canvas>
      
      {/* Interface de contrôle */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.9)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        maxWidth: '300px'
      }}>
        <h3>🔬 Multi-Slice Control</h3>
        <p><strong>Active Slices:</strong> {selectedSlices.length}</p>
        <p><strong>Recursion:</strong> {recursionDepth}/4</p>
        
        <div style={{ marginTop: '10px' }}>
          <h4>Selected Slices:</h4>
          {selectedSlices.length === 0 ? (
            <p style={{ color: '#888' }}>Click on slices to select</p>
          ) : (
            selectedSlices.map(sliceId => {
              const slice = slices.find(s => s.id === sliceId);
              const config = slice ? DIMENSION_CONFIGS[slice.dimension as keyof typeof DIMENSION_CONFIGS] : null;
              return (
                <div key={sliceId} style={{
                  margin: '5px 0',
                  padding: '5px',
                  background: config?.color || '#333',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}>
                  {config?.symbol} {config?.name}
                </div>
              );
            })
          )}
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <button
            onClick={() => setSelectedSlices([])}
            style={{
              padding: '8px 15px',
              background: '#F44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Selection
          </button>
        </div>
      </div>
      
      {/* Légende des dimensions */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontFamily: 'monospace'
      }}>
        <h4>📊 Dimension Legend</h4>
        {Object.entries(DIMENSION_CONFIGS).map(([key, config]) => (
          <div key={key} style={{ margin: '3px 0', fontSize: '12px' }}>
            <span style={{ color: config.color }}>{config.symbol}</span> {config.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSliceView; 