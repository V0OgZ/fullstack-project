package com.heroesoftimepoc.temporalengine.model;

import javax.persistence.*;
import java.util.Objects;

/**
 * Représente une amplitude complexe pour les calculs quantiques.
 * ψ = a + bi où a et b sont des réels.
 * La probabilité est |ψ|² = a² + b²
 */
@Embeddable
public class ComplexAmplitude {
    
    @Column(name = "real_part")
    private Double realPart = 1.0;
    
    @Column(name = "imaginary_part")
    private Double imaginaryPart = 0.0;
    
    // Constructors
    public ComplexAmplitude() {
        this(1.0, 0.0);
    }
    
    public ComplexAmplitude(double realPart, double imaginaryPart) {
        this.realPart = realPart;
        this.imaginaryPart = imaginaryPart;
    }
    
    public ComplexAmplitude(double realPart) {
        this(realPart, 0.0);
    }
    
    // Factory methods
    public static ComplexAmplitude fromProbability(double probability) {
        return new ComplexAmplitude(Math.sqrt(probability), 0.0);
    }
    
    public static ComplexAmplitude fromPolar(double magnitude, double phase) {
        return new ComplexAmplitude(
            magnitude * Math.cos(phase),
            magnitude * Math.sin(phase)
        );
    }
    
    public static ComplexAmplitude pure(double realPart) {
        return new ComplexAmplitude(realPart, 0.0);
    }
    
    public static ComplexAmplitude imaginary(double imaginaryPart) {
        return new ComplexAmplitude(0.0, imaginaryPart);
    }
    
    // Getters and Setters
    public Double getRealPart() { return realPart; }
    public void setRealPart(Double realPart) { this.realPart = realPart; }
    
    public Double getImaginaryPart() { return imaginaryPart; }
    public void setImaginaryPart(Double imaginaryPart) { this.imaginaryPart = imaginaryPart; }
    
    // Quantum calculations
    
    /**
     * Calcule la probabilité |ψ|² = a² + b²
     */
    public double getProbability() {
        return realPart * realPart + imaginaryPart * imaginaryPart;
    }
    
    /**
     * Calcule le module |ψ| = √(a² + b²)
     */
    public double getMagnitude() {
        return Math.sqrt(getProbability());
    }
    
    /**
     * Calcule la phase φ = arctan(b/a)
     */
    public double getPhase() {
        return Math.atan2(imaginaryPart, realPart);
    }
    
    /**
     * Calcule le conjugué complexe ψ* = a - bi
     */
    public ComplexAmplitude conjugate() {
        return new ComplexAmplitude(realPart, -imaginaryPart);
    }
    
    /**
     * Normalise l'amplitude pour que |ψ|² = 1
     */
    public ComplexAmplitude normalize() {
        double magnitude = getMagnitude();
        if (magnitude == 0.0) {
            return new ComplexAmplitude(1.0, 0.0);
        }
        return new ComplexAmplitude(realPart / magnitude, imaginaryPart / magnitude);
    }
    
    // Arithmetic operations
    
    /**
     * Addition : ψ₁ + ψ₂ = (a₁ + a₂) + (b₁ + b₂)i
     */
    public ComplexAmplitude add(ComplexAmplitude other) {
        return new ComplexAmplitude(
            this.realPart + other.realPart,
            this.imaginaryPart + other.imaginaryPart
        );
    }
    
    /**
     * Soustraction : ψ₁ - ψ₂ = (a₁ - a₂) + (b₁ - b₂)i
     */
    public ComplexAmplitude subtract(ComplexAmplitude other) {
        return new ComplexAmplitude(
            this.realPart - other.realPart,
            this.imaginaryPart - other.imaginaryPart
        );
    }
    
    /**
     * Multiplication : ψ₁ * ψ₂ = (a₁a₂ - b₁b₂) + (a₁b₂ + b₁a₂)i
     */
    public ComplexAmplitude multiply(ComplexAmplitude other) {
        return new ComplexAmplitude(
            this.realPart * other.realPart - this.imaginaryPart * other.imaginaryPart,
            this.realPart * other.imaginaryPart + this.imaginaryPart * other.realPart
        );
    }
    
    /**
     * Multiplication par un scalaire : c * ψ = c * a + c * b * i
     */
    public ComplexAmplitude multiply(double scalar) {
        return new ComplexAmplitude(
            this.realPart * scalar,
            this.imaginaryPart * scalar
        );
    }
    
    /**
     * Division : ψ₁ / ψ₂ = ψ₁ * (ψ₂*)  / |ψ₂|²
     */
    public ComplexAmplitude divide(ComplexAmplitude other) {
        double denominator = other.getProbability();
        if (denominator == 0.0) {
            throw new ArithmeticException("Division by zero amplitude");
        }
        ComplexAmplitude numerator = this.multiply(other.conjugate());
        return numerator.multiply(1.0 / denominator);
    }
    
    // Quantum interference methods
    
    /**
     * Interférence constructive : optimise la phase pour maximiser |ψ₁ + ψ₂|²
     */
    public static ComplexAmplitude constructiveInterference(ComplexAmplitude amp1, ComplexAmplitude amp2) {
        // Ajuster la phase de amp2 pour maximiser l'interférence
        double phase1 = amp1.getPhase();
        double magnitude2 = amp2.getMagnitude();
        
        // Créer amp2 avec la même phase que amp1
        ComplexAmplitude alignedAmp2 = ComplexAmplitude.fromPolar(magnitude2, phase1);
        
        return amp1.add(alignedAmp2);
    }
    
    /**
     * Interférence destructive : optimise la phase pour minimiser |ψ₁ + ψ₂|²
     */
    public static ComplexAmplitude destructiveInterference(ComplexAmplitude amp1, ComplexAmplitude amp2) {
        // Ajuster la phase de amp2 pour minimiser l'interférence
        double phase1 = amp1.getPhase();
        double magnitude2 = amp2.getMagnitude();
        
        // Créer amp2 avec la phase opposée à amp1
        ComplexAmplitude opposedAmp2 = ComplexAmplitude.fromPolar(magnitude2, phase1 + Math.PI);
        
        return amp1.add(opposedAmp2);
    }
    
    /**
     * Calcule le contraste d'interférence entre deux amplitudes
     */
    public static double getInterferenceContrast(ComplexAmplitude amp1, ComplexAmplitude amp2) {
        double constructiveProb = constructiveInterference(amp1, amp2).getProbability();
        double destructiveProb = destructiveInterference(amp1, amp2).getProbability();
        
        if (constructiveProb + destructiveProb == 0) {
            return 0.0;
        }
        
        return (constructiveProb - destructiveProb) / (constructiveProb + destructiveProb);
    }
    
    // Utility methods
    
    /**
     * Vérifie si l'amplitude est réelle (partie imaginaire nulle)
     */
    public boolean isReal() {
        return Math.abs(imaginaryPart) < 1e-10;
    }
    
    /**
     * Vérifie si l'amplitude est imaginaire pure (partie réelle nulle)
     */
    public boolean isImaginary() {
        return Math.abs(realPart) < 1e-10;
    }
    
    /**
     * Vérifie si l'amplitude est nulle
     */
    public boolean isZero() {
        return Math.abs(realPart) < 1e-10 && Math.abs(imaginaryPart) < 1e-10;
    }
    
    /**
     * Vérifie si l'amplitude est normalisée (|ψ|² = 1)
     */
    public boolean isNormalized() {
        return Math.abs(getProbability() - 1.0) < 1e-10;
    }
    
    /**
     * Conversion vers représentation polaire
     */
    public String toPolarString() {
        return String.format("%.4f∠%.4f", getMagnitude(), getPhase());
    }
    
    /**
     * Conversion vers représentation cartésienne
     */
    public String toCartesianString() {
        if (imaginaryPart >= 0) {
            return String.format("%.4f+%.4fi", realPart, imaginaryPart);
        } else {
            return String.format("%.4f%.4fi", realPart, imaginaryPart);
        }
    }
    
    // Object overrides
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ComplexAmplitude that = (ComplexAmplitude) obj;
        return Objects.equals(realPart, that.realPart) &&
               Objects.equals(imaginaryPart, that.imaginaryPart);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(realPart, imaginaryPart);
    }
    
    @Override
    public String toString() {
        return toCartesianString();
    }
} 