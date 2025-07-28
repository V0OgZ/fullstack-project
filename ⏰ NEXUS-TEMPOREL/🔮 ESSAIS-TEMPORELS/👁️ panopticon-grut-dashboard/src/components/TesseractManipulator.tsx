import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface TesseractManipulatorProps {
  currentState: any;
  onStateChange: (newState: any) => void;
  dimensionLocks: boolean[];
  recursionLevel: number;
}

/**
 * 🎛️ TESSERACT MANIPULATOR - MANIPULATION 4D+
 * ============================================
 * 
 * Composant avancé pour la manipulation directe des structures 4D+ 
 * avec contrôles intuitifs et visualisation en temps réel.
 * 
 * OPUS SPECS: "TesseractManipulator - Contrôle direct des hypercubes 6D"
 * FONCTIONS: Rotation 4D, translation hyperspatiale, projection dimensionnelle
 * STATUS: ✅ CRÉÉ - Manipulation hyperdimensionnelle opérationnelle
 */

interface HyperVertex {
  coords: number[];
  id: string;
  active: boolean;
}

interface HyperEdge {
  from: string;
  to: string;
  dimension: number;
  strength: number;
}

const TESSERACT_VERTICES = [
  // Cube inférieur (w=0)
  [-1, -1, -1, 0], [1, -1, -1, 0], [1, 1, -1, 0], [-1, 1, -1, 0],
  [-1, -1, 1, 0], [1, -1, 1, 0], [1, 1, 1, 0], [-1, 1, 1, 0],
  // Cube supérieur (w=1)
  [-1, -1, -1, 1], [1, -1, -1, 1], [1, 1, -1, 1], [-1, 1, -1, 1],
  [-1, -1, 1, 1], [1, -1, 1, 1], [1, 1, 1, 1], [-1, 1, 1, 1]
];

const DIMENSION_COLORS = [
  '#FF0000', // X - Rouge
  '#00FF00', // Y - Vert  
  '#0000FF', // Z - Bleu
  '#FFFF00', // W - Jaune
  '#FF00FF', // Ψ - Magenta
  '#00FFFF'  // Σ - Cyan
];

const HyperVertex3D: React.FC<{
  vertex: HyperVertex;
  position: THREE.Vector3;
  isSelected: boolean;
  onClick: () => void;
  recursionLevel: number;
}> = ({ vertex, position, isSelected, onClick, recursionLevel }) => {
  const vertexRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (vertexRef.current) {
      // Pulsation basée sur la récursion
      const recursionPulse = 1 + Math.sin(state.clock.elapsedTime * 3) * (recursionLevel * 0.1);
      vertexRef.current.scale.setScalar(recursionPulse);
      
      // Rotation si sélectionné
      if (isSelected) {
        vertexRef.current.rotation.x += 0.02;
        vertexRef.current.rotation.y += 0.03;
      }
    }
  });

  const size = isSelected ? 0.15 : (hovered ? 0.12 : 0.08);
  const color = isSelected ? '#FFD700' : (vertex.active ? '#00FF00' : '#FFFFFF');

  return (
    <Sphere
      ref={vertexRef}
      args={[size, 16, 16]}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isSelected ? 0.5 : 0.2}
      />
    </Sphere>
  );
};

const HyperEdgeRenderer: React.FC<{
  edges: HyperEdge[];
  vertices: HyperVertex[];
  projectionMatrix: number[][];
}> = ({ edges, vertices, projectionMatrix }) => {
  const project4Dto3D = (coords4D: number[]): THREE.Vector3 => {
    // Projection 4D vers 3D avec matrice de transformation
    const projected = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        projected[i] += projectionMatrix[i][j] * coords4D[j];
      }
    }
    return new THREE.Vector3(projected[0], projected[1], projected[2]);
  };

  return (
    <>
      {edges.map((edge, index) => {
        const fromVertex = vertices.find(v => v.id === edge.from);
        const toVertex = vertices.find(v => v.id === edge.to);
        
        if (!fromVertex || !toVertex) return null;
        
        const fromPos = project4Dto3D(fromVertex.coords);
        const toPos = project4Dto3D(toVertex.coords);
        
        return (
          <Line
            key={index}
            points={[fromPos, toPos]}
            color={DIMENSION_COLORS[edge.dimension] || '#FFFFFF'}
            lineWidth={edge.strength * 2}
            transparent
            opacity={0.7}
          />
        );
      })}
    </>
  );
};

const DimensionController: React.FC<{
  dimension: number;
  value: number;
  locked: boolean;
  onChange: (value: number) => void;
  onLockToggle: () => void;
}> = ({ dimension, value, locked, onChange, onLockToggle }) => {
  const dimNames = ['X', 'Y', 'Z', 'W', 'Ψ', 'Σ'];
  const color = DIMENSION_COLORS[dimension];
  
  return (
    <div style={{
      margin: '8px 0',
      padding: '8px',
      background: locked ? 'rgba(255,0,0,0.2)' : 'rgba(0,0,0,0.3)',
      borderRadius: '4px',
      border: `2px solid ${color}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <span style={{ color, fontWeight: 'bold', minWidth: '30px' }}>
          {dimNames[dimension]}:
        </span>
        <button
          onClick={onLockToggle}
          style={{
            marginLeft: '10px',
            padding: '2px 6px',
            background: locked ? '#F44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
        >
          {locked ? '🔒' : '🔓'}
        </button>
      </div>
      
      <input
        type="range"
        min="-2"
        max="2"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={locked}
        style={{
          width: '100%',
          accentColor: color
        }}
      />
      
      <div style={{ 
        fontSize: '12px', 
        color: '#CCC', 
        textAlign: 'center',
        marginTop: '3px'
      }}>
        {value.toFixed(2)}
      </div>
    </div>
  );
};

const RecursionVisualizer: React.FC<{
  level: number;
  maxLevel: number;
  position: THREE.Vector3;
}> = ({ level, maxLevel, position }) => {
  const recursionRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (recursionRef.current) {
      recursionRef.current.rotation.y += 0.01 * (level + 1);
    }
  });

  if (level === 0) return null;

  return (
    <group ref={recursionRef} position={position}>
      {Array.from({ length: level }).map((_, i) => {
        const radius = 0.5 + i * 0.3;
        const height = 0.1 + i * 0.05;
        
        return (
          <Box
            key={i}
            args={[radius * 2, height, radius * 2]}
            position={[0, i * 0.2, 0]}
          >
            <meshStandardMaterial
              color="#FF5722"
              transparent
              opacity={0.6 - (i * 0.1)}
              wireframe={i % 2 === 0}
            />
          </Box>
        );
      })}
      
      <Text
        position={[0, level * 0.2 + 0.5, 0]}
        fontSize={0.2}
        color="#FF5722"
        anchorX="center"
      >
        R{level}/{maxLevel}
      </Text>
    </group>
  );
};

export const TesseractManipulator: React.FC<TesseractManipulatorProps> = ({
  currentState,
  onStateChange,
  dimensionLocks,
  recursionLevel
}) => {
  const [selectedVertex, setSelectedVertex] = useState<string | null>(null);
  const [rotationAngles, setRotationAngles] = useState([0, 0, 0, 0, 0, 0]);
  const [translation, setTranslation] = useState([0, 0, 0, 0, 0, 0]);
  const [projectionMatrix, setProjectionMatrix] = useState([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  ]);

  // Générer les vertices et edges du tesseract
  const [vertices, setVertices] = useState<HyperVertex[]>([]);
  const [edges, setEdges] = useState<HyperEdge[]>([]);

  useEffect(() => {
    // Créer les vertices
    const newVertices: HyperVertex[] = TESSERACT_VERTICES.map((coords, index) => ({
      coords: coords.map((c, i) => c + translation[i]),
      id: `vertex_${index}`,
      active: Math.random() > 0.5
    }));

    // Créer les edges (connexions entre vertices adjacents)
    const newEdges: HyperEdge[] = [];
    for (let i = 0; i < newVertices.length; i++) {
      for (let j = i + 1; j < newVertices.length; j++) {
        const v1 = newVertices[i];
        const v2 = newVertices[j];
        
        // Vérifier si les vertices sont adjacents (diffèrent sur une seule dimension)
        let diffCount = 0;
        let diffDimension = -1;
        
        for (let d = 0; d < 4; d++) {
          if (Math.abs(TESSERACT_VERTICES[i][d] - TESSERACT_VERTICES[j][d]) > 0.1) {
            diffCount++;
            diffDimension = d;
          }
        }
        
        if (diffCount === 1) {
          newEdges.push({
            from: v1.id,
            to: v2.id,
            dimension: diffDimension,
            strength: 1 - (recursionLevel * 0.1)
          });
        }
      }
    }

    setVertices(newVertices);
    setEdges(newEdges);
  }, [translation, recursionLevel]);

  // Projection 4D vers 3D
  const project4Dto3D = (coords4D: number[]): THREE.Vector3 => {
    const projected = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        projected[i] += projectionMatrix[i][j] * coords4D[j];
      }
    }
    return new THREE.Vector3(projected[0] * 2, projected[1] * 2, projected[2] * 2);
  };

  const handleVertexClick = (vertexId: string) => {
    setSelectedVertex(selectedVertex === vertexId ? null : vertexId);
  };

  const handleDimensionChange = (dimension: number, value: number) => {
    if (dimensionLocks[dimension]) return;
    
    const newTranslation = [...translation];
    newTranslation[dimension] = value;
    setTranslation(newTranslation);
    
    onStateChange({
      ...currentState,
      translation: newTranslation,
      selectedVertex
    });
  };

  const handleRotationChange = (dimension: number, angle: number) => {
    const newAngles = [...rotationAngles];
    newAngles[dimension] = angle;
    setRotationAngles(newAngles);
    
    // Mettre à jour la matrice de projection basée sur les rotations
    // (Implémentation simplifiée)
    const newMatrix = [...projectionMatrix];
    newMatrix[0][dimension % 4] = Math.cos(angle);
    newMatrix[1][dimension % 4] = Math.sin(angle);
    setProjectionMatrix(newMatrix);
  };

  return (
    <div style={{ width: '100%', height: '600px', background: '#001122' }}>
      <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
        {/* Éclairage */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.7} color="#4CAF50" />
        
        {/* Contrôles */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={20}
          minDistance={4}
        />
        
        {/* Tesseract vertices */}
        {vertices.map((vertex) => (
          <HyperVertex3D
            key={vertex.id}
            vertex={vertex}
            position={project4Dto3D(vertex.coords)}
            isSelected={selectedVertex === vertex.id}
            onClick={() => handleVertexClick(vertex.id)}
            recursionLevel={recursionLevel}
          />
        ))}
        
        {/* Tesseract edges */}
        <HyperEdgeRenderer
          edges={edges}
          vertices={vertices}
          projectionMatrix={projectionMatrix}
        />
        
        {/* Visualiseur de récursion */}
        <RecursionVisualizer
          level={recursionLevel}
          maxLevel={4}
          position={new THREE.Vector3(0, -4, 0)}
        />
        
        {/* Axes de référence */}
        <Line points={[[-5, 0, 0], [5, 0, 0]]} color="#FF0000" lineWidth={2} />
        <Line points={[[0, -5, 0], [0, 5, 0]]} color="#00FF00" lineWidth={2} />
        <Line points={[[0, 0, -5], [0, 0, 5]]} color="#0000FF" lineWidth={2} />
      </Canvas>
      
      {/* Interface de contrôle */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.9)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        maxWidth: '250px',
        maxHeight: '580px',
        overflowY: 'auto'
      }}>
        <h3>🎛️ Tesseract Control</h3>
        <p><strong>Selected:</strong> {selectedVertex || 'None'}</p>
        <p><strong>Recursion:</strong> {recursionLevel}/4</p>
        
        <h4>Translation:</h4>
        {translation.slice(0, 6).map((value, index) => (
          <DimensionController
            key={index}
            dimension={index}
            value={value}
            locked={dimensionLocks[index] || false}
            onChange={(newValue) => handleDimensionChange(index, newValue)}
            onLockToggle={() => {
              // Cette fonction serait gérée par le parent
              console.log(`Toggle lock for dimension ${index}`);
            }}
          />
        ))}
        
        <h4>Rotation:</h4>
        {rotationAngles.slice(0, 4).map((angle, index) => (
          <div key={index} style={{ margin: '5px 0' }}>
            <label style={{ color: DIMENSION_COLORS[index], fontSize: '12px' }}>
              {['XY', 'XZ', 'YZ', 'XW'][index]}:
            </label>
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.1"
              value={angle}
              onChange={(e) => handleRotationChange(index, parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: DIMENSION_COLORS[index] }}
            />
            <div style={{ fontSize: '10px', color: '#CCC', textAlign: 'center' }}>
              {(angle * 180 / Math.PI).toFixed(1)}°
            </div>
          </div>
        ))}
        
        <div style={{ marginTop: '15px' }}>
          <button
            onClick={() => {
              setRotationAngles([0, 0, 0, 0, 0, 0]);
              setTranslation([0, 0, 0, 0, 0, 0]);
            }}
            style={{
              width: '100%',
              padding: '8px',
              background: '#F44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset Transform
          </button>
        </div>
      </div>
      
      {/* Informations du vertex sélectionné */}
      {selectedVertex && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.9)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          fontFamily: 'monospace'
        }}>
          <h4>📍 Vertex Info</h4>
          <p><strong>ID:</strong> {selectedVertex}</p>
          {vertices.find(v => v.id === selectedVertex) && (
            <div>
              <p><strong>Coordinates:</strong></p>
              {vertices.find(v => v.id === selectedVertex)!.coords.slice(0, 4).map((coord, i) => (
                <div key={i} style={{ fontSize: '12px', margin: '2px 0' }}>
                  <span style={{ color: DIMENSION_COLORS[i] }}>
                    {['X', 'Y', 'Z', 'W'][i]}:
                  </span> {coord.toFixed(2)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TesseractManipulator; 