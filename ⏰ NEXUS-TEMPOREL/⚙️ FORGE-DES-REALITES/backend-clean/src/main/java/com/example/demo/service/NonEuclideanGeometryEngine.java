package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;

/**
 * 🌀 NON-EUCLIDEAN GEOMETRY ENGINE
 * Moteur de géométrie non-euclidienne pour Heroes of Time
 * Implémentation en dur selon les spécifications GRUT
 */
@Service
public class NonEuclideanGeometryEngine {

    // 🔬 CONSTANTES GÉOMÉTRIQUES GRUT
    private static final double PHI = 1.618033988749895; // Golden ratio
    private static final double PSI_CONSTANT = 2.236067977; // √5 pour états ψ
    private static final double GRUT_CURVATURE = 0.666; // Courbure GRUT

    /**
     * 🗺️ GÉNÉRATION MAP NON-EUCLIDIENNE
     * Crée une carte avec géométrie courbée selon formules GRUT
     */
    public Map<String, Object> generateNonEuclideanMap(String worldId, int size) {
        Map<String, Object> map = new HashMap<>();
        
        // Matrice de courbure spatiale
        double[][] curvatureMatrix = generateCurvatureMatrix(size);
        
        // Points de distorsion temporelle
        List<Map<String, Object>> distortionPoints = generateDistortionPoints(worldId, size);
        
        // Portails non-euclidiens
        List<Map<String, Object>> nonEuclideanPortals = generatePortals(worldId, curvatureMatrix);
        
        map.put("worldId", worldId);
        map.put("size", size);
        map.put("geometry_type", "NON_EUCLIDEAN");
        map.put("curvature_matrix", curvatureMatrix);
        map.put("distortion_points", distortionPoints);
        map.put("portals", nonEuclideanPortals);
        map.put("grut_signature", calculateGrutSignature(curvatureMatrix));
        
        return map;
    }

    /**
     * 📐 MATRICE DE COURBURE SPATIALE
     * Génère la courbure selon les formules de géométrie hyperbolique
     */
    private double[][] generateCurvatureMatrix(int size) {
        double[][] matrix = new double[size][size];
        
        for (int x = 0; x < size; x++) {
            for (int y = 0; y < size; y++) {
                // Formule de courbure hyperbolique
                double distance = Math.sqrt(x * x + y * y);
                double curvature = GRUT_CURVATURE * Math.tanh(distance / PHI);
                
                // Ajout de perturbations quantiques
                double psiPerturbation = PSI_CONSTANT * Math.sin(x * PHI) * Math.cos(y * PHI);
                
                matrix[x][y] = curvature + (psiPerturbation * 0.1);
            }
        }
        
        return matrix;
    }

    /**
     * 🌀 POINTS DE DISTORSION TEMPORELLE
     * Crée des zones où l'espace-temps se courbe
     */
    private List<Map<String, Object>> generateDistortionPoints(String worldId, int size) {
        List<Map<String, Object>> points = new ArrayList<>();
        
        // Calcul des points selon la séquence de Fibonacci
        int fibCount = Math.min(8, size / 2);
        int[] fibonacci = generateFibonacci(fibCount);
        
        for (int i = 0; i < fibCount; i++) {
            Map<String, Object> point = new HashMap<>();
            
            int x = fibonacci[i] % size;
            int y = (int) ((fibonacci[i] * PHI) % size);
            
            point.put("x", (int) x);
            point.put("y", (int) y);
            point.put("intensity", fibonacci[i] / 100.0);
            point.put("type", "TEMPORAL_DISTORTION");
            point.put("formula", "ψ" + i + ": ⊙(Δt+" + fibonacci[i] + ")");
            
            points.add(point);
        }
        
        return points;
    }

    /**
     * 🚪 PORTAILS NON-EUCLIDIENS
     * Génère des portails qui défient la géométrie classique
     */
    private List<Map<String, Object>> generatePortals(String worldId, double[][] curvatureMatrix) {
        List<Map<String, Object>> portals = new ArrayList<>();
        int size = curvatureMatrix.length;
        
        // Recherche des maxima de courbure pour placer les portails
        for (int x = 1; x < size - 1; x++) {
            for (int y = 1; y < size - 1; y++) {
                double currentCurvature = curvatureMatrix[x][y];
                
                // Si c'est un maximum local de courbure
                if (isLocalMaximum(curvatureMatrix, x, y) && currentCurvature > 0.5) {
                    Map<String, Object> portal = new HashMap<>();
                    
                    portal.put("x", x);
                    portal.put("y", y);
                    portal.put("curvature", currentCurvature);
                    portal.put("type", "NON_EUCLIDEAN_PORTAL");
                    portal.put("destination", calculateDestination(worldId, x, y));
                    portal.put("geometry_effect", "HYPERBOLIC_WARP");
                    
                    portals.add(portal);
                }
            }
        }
        
        return portals;
    }

    /**
     * 🔢 GÉNÉRATION FIBONACCI
     */
    private int[] generateFibonacci(int count) {
        int[] fib = new int[count];
        if (count > 0) fib[0] = 1;
        if (count > 1) fib[1] = 1;
        
        for (int i = 2; i < count; i++) {
            fib[i] = fib[i-1] + fib[i-2];
        }
        
        return fib;
    }

    /**
     * 🎯 DÉTECTION MAXIMUM LOCAL
     */
    private boolean isLocalMaximum(double[][] matrix, int x, int y) {
        double center = matrix[x][y];
        
        for (int dx = -1; dx <= 1; dx++) {
            for (int dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0) continue;
                
                int nx = x + dx;
                int ny = y + dy;
                
                if (nx >= 0 && nx < matrix.length && ny >= 0 && ny < matrix[0].length) {
                    if (matrix[nx][ny] >= center) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }

    /**
     * 🎲 CALCUL DESTINATION PORTAIL
     */
    private String calculateDestination(String worldId, int x, int y) {
        // Logique de destination basée sur la géométrie
        double angle = Math.atan2(y, x);
        double radius = Math.sqrt(x * x + y * y);
        
        if (angle < Math.PI / 4) return "WORLD_A";
        else if (angle < Math.PI / 2) return "WORLD_B";
        else if (angle < 3 * Math.PI / 4) return "WORLD_C";
        else return "INTERSTICE";
    }

    /**
     * ✨ SIGNATURE GRUT
     * Calcule la signature géométrique unique
     */
    private String calculateGrutSignature(double[][] matrix) {
        double sum = 0;
        for (double[] row : matrix) {
            for (double value : row) {
                sum += value;
            }
        }
        
        return "GRUT_" + String.format("%.3f", sum * PHI).replace(".", "_");
    }

    /**
     * 🌀 FORMULE DISTANCE NON-EUCLIDIENNE
     * Calcule la distance dans l'espace courbé
     */
    public double calculateNonEuclideanDistance(int x1, int y1, int x2, int y2, double curvature) {
        // Distance euclidienne classique
        double euclideanDistance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        
        // Correction non-euclidienne
        double curvatureEffect = 1 + (curvature * Math.sin(euclideanDistance / PHI));
        
        return euclideanDistance * curvatureEffect;
    }

    /**
     * 🎭 VALIDATION GÉOMÉTRIE GRUT
     * Vérifie que la géométrie respecte les lois GRUT
     */
    public boolean validateGrutGeometry(Map<String, Object> map) {
        if (!map.containsKey("curvature_matrix")) return false;
        if (!map.containsKey("grut_signature")) return false;
        
        String signature = (String) map.get("grut_signature");
        return signature.startsWith("GRUT_");
    }
} 