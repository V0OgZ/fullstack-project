import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

interface PortalRoomProps {
  currentDimension: string;
  onDimensionChange: (dimension: string) => void;
  quantumStress: number;
}

/**
 * 🌌 PORTAL ROOM - SALLE DES PORTAILS 6D
 * ======================================
 * 
 * Composant React Three.js pour la visualisation de la salle des portails
 * permettant la navigation entre les 6 dimensions du Panopticon.
 * 
 * DIMENSIONS: X,Y,Z (Space) + T (Time) + Ψ (Causality) + Σ (Superposition) + S (Entropy) + 𝕽 (Recursivity)
 * OPUS SPECS: "PortalRoom - Navigation dimensionnelle avec portails interactifs"
 * STATUS: ✅ CRÉÉ - Portails 6D opérationnels
 */

const DIMENSIONS = [
  { id: 'SPACE_XYZ', name: 'Space (X,Y,Z)', color: '#4CAF50', position: [-3, 0, 0] },
  { id: 'TIME_T', name: 'Time (T)', color: '#2196F3', position: [3, 0, 0] },
  { id: 'CAUSALITY_PSI', name: 'Causality (Ψ)', color: '#FF9800', position: [0, 3, 0] },
  { id: 'SUPERPOSITION_SIGMA', name: 'Superposition (Σ)', color: '#9C27B0', position: [0, -3, 0] },
  { id: 'ENTROPY_S', name: 'Entropy (S)', color: '#F44336', position: [0, 0, 3] },
  { id: 'RECURSIVITY_R', name: 'Recursivity (𝕽)', color: '#FF5722', position: [0, 0, -3] }
];

const Portal: React.FC<{
  dimension: any;
  isActive: boolean;
  onClick: () => void;
  quantumStress: number;
}> = ({ dimension, isActive, onClick, quantumStress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation basée sur le stress quantique
      meshRef.current.rotation.x += 0.01 + (quantumStress / 1000);
      meshRef.current.rotation.y += 0.02 + (quantumStress / 800);
      
      // Pulsation si actif
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      }
      
      // Effet de hover
      if (hovered) {
        meshRef.current.scale.multiplyScalar(1.1);
      }
    }
  });

  return (
    <group position={dimension.position}>
      {/* Portail principal */}
      <Sphere
        ref={meshRef}
        args={[0.8, 32, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={dimension.color}
          emissive={isActive ? dimension.color : '#000000'}
          emissiveIntensity={isActive ? 0.3 : 0}
          transparent
          opacity={0.7}
        />
      </Sphere>
      
      {/* Anneau de portail */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.1, 8, 32]} />
        <meshStandardMaterial
          color={dimension.color}
          emissive={dimension.color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Texte de dimension */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.3}
        color={dimension.color}
        anchorX="center"
        anchorY="middle"
      >
        {dimension.name}
      </Text>
      
      {/* Particules quantiques */}
      {isActive && (
        <group>
          {Array.from({ length: 20 }).map((_, i) => (
            <Sphere key={i} args={[0.02]} position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 3
            ]}>
              <meshBasicMaterial color={dimension.color} />
            </Sphere>
          ))}
        </group>
      )}
    </group>
  );
};

const QuantumStressIndicator: React.FC<{ stress: number }> = ({ stress }) => {
  const getStressColor = (stress: number) => {
    if (stress < 30) return '#4CAF50';
    if (stress < 70) return '#FF9800';
    return '#F44336';
  };

  return (
    <group position={[0, 4, 0]}>
      <Box args={[4, 0.5, 0.2]}>
        <meshStandardMaterial color="#333333" />
      </Box>
      <Box args={[(stress / 100) * 4, 0.3, 0.3]} position={[((stress / 100) * 4 - 4) / 2, 0, 0.1]}>
        <meshStandardMaterial color={getStressColor(stress)} />
      </Box>
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.3}
        color="#FFFFFF"
        anchorX="center"
      >
        Quantum Stress: {stress.toFixed(1)}%
      </Text>
    </group>
  );
};

const CentralCore: React.FC<{ currentDimension: string; quantumStress: number }> = ({ 
  currentDimension, 
  quantumStress 
}) => {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += 0.005;
      coreRef.current.rotation.y += 0.01;
      coreRef.current.rotation.z += 0.003;
      
      // Effet de stress quantique
      const stressEffect = 1 + Math.sin(state.clock.elapsedTime * 5) * (quantumStress / 500);
      coreRef.current.scale.setScalar(stressEffect);
    }
  });

  return (
    <group>
      {/* Noyau central */}
      <Sphere ref={coreRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Texte dimension actuelle */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.4}
        color="#FFD700"
        anchorX="center"
      >
        {currentDimension}
      </Text>
      
      {/* Grille de base */}
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <meshBasicMaterial color="#222222" wireframe />
      </Plane>
    </group>
  );
};

export const PortalRoom: React.FC<PortalRoomProps> = ({ 
  currentDimension, 
  onDimensionChange, 
  quantumStress 
}) => {
  const [selectedDimension, setSelectedDimension] = useState(currentDimension);

  const handlePortalClick = (dimensionId: string) => {
    setSelectedDimension(dimensionId);
    onDimensionChange(dimensionId);
  };

  return (
    <div style={{ width: '100%', height: '600px', background: '#000011' }}>
      <Canvas camera={{ position: [8, 8, 8], fov: 60 }}>
        {/* Éclairage */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4CAF50" />
        
        {/* Contrôles */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={20}
          minDistance={5}
        />
        
        {/* Noyau central */}
        <CentralCore currentDimension={selectedDimension} quantumStress={quantumStress} />
        
        {/* Indicateur de stress */}
        <QuantumStressIndicator stress={quantumStress} />
        
        {/* Portails dimensionnels */}
        {DIMENSIONS.map((dimension) => (
          <Portal
            key={dimension.id}
            dimension={dimension}
            isActive={dimension.id === selectedDimension}
            onClick={() => handlePortalClick(dimension.id)}
            quantumStress={quantumStress}
          />
        ))}
        
        {/* Étoiles de fond */}
        {Array.from({ length: 100 }).map((_, i) => (
          <Sphere
            key={i}
            args={[0.01]}
            position={[
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 50
            ]}
          >
            <meshBasicMaterial color="#FFFFFF" />
          </Sphere>
        ))}
      </Canvas>
      
      {/* Interface de contrôle */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontFamily: 'monospace'
      }}>
        <h3>🌌 Portal Room Control</h3>
        <p><strong>Current:</strong> {selectedDimension}</p>
        <p><strong>Stress:</strong> {quantumStress.toFixed(1)}%</p>
        <div style={{ marginTop: '10px' }}>
          {DIMENSIONS.map((dim) => (
            <button
              key={dim.id}
              onClick={() => handlePortalClick(dim.id)}
              style={{
                margin: '2px',
                padding: '5px 10px',
                background: dim.id === selectedDimension ? dim.color : '#333',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {dim.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortalRoom; 