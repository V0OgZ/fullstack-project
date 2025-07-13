import { ApiService } from './api';
import { PoliticalAdvisor, PoliticalEvent, PoliticalChoice, Reputation } from '../types/game';

export interface AdvisorRecommendation {
  advisorId: string;
  advisorName: string;
  recommendation: 'strongly_support' | 'support' | 'neutral' | 'oppose' | 'strongly_oppose';
  reasoning: string;
  confidenceLevel: number; // 0-100
}

export class BackendPoliticalAdvisorService {
  
  /**
   * Get all political advisors from backend
   */
  static async getPoliticalAdvisors(): Promise<PoliticalAdvisor[]> {
    try {
      const response = await ApiService.getPoliticalAdvisors();
      return response;
    } catch (error) {
      console.error('Error fetching political advisors:', error);
      // Fallback to empty array if backend is not available
      return [];
    }
  }

  /**
   * Generate AI recommendations for a political choice using backend
   */
  static async generateAdvisorRecommendations(event: PoliticalEvent, choice: PoliticalChoice): Promise<AdvisorRecommendation[]> {
    try {
      const response = await ApiService.generateAdvisorRecommendations(event, choice);
      return response;
    } catch (error) {
      console.error('Error generating advisor recommendations:', error);
      // Fallback to empty array if backend is not available
      return [];
    }
  }

  /**
   * Generate dynamic political events using backend
   */
  static async generateRandomPoliticalEvent(currentReputation: Reputation, turn: number): Promise<PoliticalEvent | null> {
    try {
      const response = await ApiService.generatePoliticalEvent(currentReputation, turn);
      return response;
    } catch (error) {
      console.error('Error generating political event:', error);
      // Return null if backend is not available
      return null;
    }
  }

  /**
   * Update advisor opinions using backend
   */
  static async updateAdvisorOpinions(
    currentAdvisors: PoliticalAdvisor[], 
    choice: PoliticalChoice
  ): Promise<PoliticalAdvisor[]> {
    try {
      const response = await ApiService.updateAdvisorOpinions(currentAdvisors, choice);
      return response;
    } catch (error) {
      console.error('Error updating advisor opinions:', error);
      // Fallback to current advisors if backend is not available
      return currentAdvisors;
    }
  }

  /**
   * Calculate overall political stability using backend
   */
  static async calculatePoliticalStability(advisors: PoliticalAdvisor[]): Promise<{
    stability: number; // 0-100
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    concerns: string[];
  }> {
    try {
      const response = await ApiService.calculatePoliticalStability(advisors);
      return response;
    } catch (error) {
      console.error('Error calculating political stability:', error);
      // Fallback calculation if backend is not available
      const avgOpinion = advisors.reduce((sum, advisor) => sum + advisor.opinion, 0) / advisors.length;
      const stability = (avgOpinion + 100) / 2; // Convert -100/100 to 0-100
      
      let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
      if (stability < 25) riskLevel = 'critical';
      else if (stability < 50) riskLevel = 'high';
      else if (stability < 75) riskLevel = 'medium';

      const concerns: string[] = [];
      advisors.forEach(advisor => {
        if (advisor.opinion < -50) {
          concerns.push(`${advisor.name} (${advisor.role}) is very dissatisfied`);
        } else if (advisor.opinion < 0) {
          concerns.push(`${advisor.name} (${advisor.role}) has concerns`);
        }
      });

      return { stability, riskLevel, concerns };
    }
  }

  /**
   * Get advisor recommendations with detailed reasoning using backend
   */
  static async getDetailedRecommendations(event: PoliticalEvent): Promise<{
    [choiceId: string]: AdvisorRecommendation[];
  }> {
    const recommendations: { [choiceId: string]: AdvisorRecommendation[] } = {};
    
    try {
      for (const choice of event.choices) {
        const recs = await this.generateAdvisorRecommendations(event, choice);
        recommendations[choice.id] = recs;
      }
    } catch (error) {
      console.error('Error getting detailed recommendations:', error);
    }

    return recommendations;
  }

  /**
   * Check if backend AI service is available
   */
  static async isBackendAvailable(): Promise<boolean> {
    try {
      await ApiService.getPoliticalAdvisors();
      return true;
    } catch (error) {
      console.warn('Backend AI service not available, using fallback logic');
      return false;
    }
  }
} 