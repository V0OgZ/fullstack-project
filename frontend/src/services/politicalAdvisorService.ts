import { PoliticalAdvisor, PoliticalEvent, PoliticalChoice, Reputation } from '../types/game';

// The 4 specialized political advisors mentioned in documentation
export const POLITICAL_ADVISORS: PoliticalAdvisor[] = [
  {
    id: 'general_volkov',
    name: 'General Volkov',
    role: 'military',
    opinion: 75,
    influence: 85,
    personality: 'aggressive',
    avatar: '🎖️'
  },
  {
    id: 'dr_petrova',
    name: 'Dr. Petrova',
    role: 'economic',
    opinion: 60,
    influence: 90,
    personality: 'cautious',
    avatar: '💼'
  },
  {
    id: 'ambassador_kozlov',
    name: 'Ambassador Kozlov',
    role: 'diplomatic',
    opinion: 45,
    influence: 70,
    personality: 'opportunistic',
    avatar: '🤝'
  },
  {
    id: 'prof_ivanova',
    name: 'Prof. Ivanova',
    role: 'scientific',
    opinion: 80,
    influence: 65,
    personality: 'idealistic',
    avatar: '🔬'
  }
];

export interface AdvisorRecommendation {
  advisorId: string;
  advisorName: string;
  recommendation: 'strongly_support' | 'support' | 'neutral' | 'oppose' | 'strongly_oppose';
  reasoning: string;
  confidenceLevel: number; // 0-100
}

export class PoliticalAdvisorService {
  
  /**
   * Generate AI recommendations for a political choice based on advisor personalities
   */
  static generateAdvisorRecommendations(event: PoliticalEvent, choice: PoliticalChoice): AdvisorRecommendation[] {
    return POLITICAL_ADVISORS.map(advisor => {
      let recommendation: AdvisorRecommendation['recommendation'] = 'neutral';
      let reasoning = '';
      let confidenceLevel = 50;

      // AI logic based on advisor personality and role
      switch (advisor.personality) {
        case 'aggressive':
          if (choice.consequences.reputation > 0 && advisor.role === 'military') {
            recommendation = 'strongly_support';
            reasoning = 'This shows strength and decisiveness!';
            confidenceLevel = 90;
          } else if (choice.consequences.reputation < -10) {
            recommendation = 'oppose';
            reasoning = 'This makes us look weak.';
            confidenceLevel = 75;
          }
          break;

        case 'cautious':
          if (Math.abs(choice.consequences.reputation) < 5) {
            recommendation = 'support';
            reasoning = 'A measured approach with minimal risk.';
            confidenceLevel = 80;
          } else {
            recommendation = 'oppose';
            reasoning = 'Too risky for uncertain gains.';
            confidenceLevel = 85;
          }
          break;

        case 'opportunistic':
          const goldGain = choice.consequences.resources.gold || 0;
          if (goldGain > 0) {
            recommendation = 'strongly_support';
            reasoning = 'Excellent economic opportunity!';
            confidenceLevel = 95;
          } else if (choice.consequences.reputation > 10) {
            recommendation = 'support';
            reasoning = 'Good for future opportunities.';
            confidenceLevel = 70;
          }
          break;

        case 'idealistic':
          if (event.type === 'diplomatic' || choice.consequences.reputation > 0) {
            recommendation = 'support';
            reasoning = 'This aligns with our values.';
            confidenceLevel = 85;
          } else if (choice.consequences.reputation < -5) {
            recommendation = 'strongly_oppose';
            reasoning = 'This goes against our principles!';
            confidenceLevel = 90;
          }
          break;
      }

      // Role-specific adjustments
      switch (advisor.role) {
        case 'military':
          if (event.type === 'military') confidenceLevel += 20;
          break;
        case 'economic':
          if (choice.consequences.resources.gold) confidenceLevel += 15;
          break;
        case 'diplomatic':
          if (event.type === 'diplomatic') confidenceLevel += 20;
          break;
        case 'scientific':
          if (event.type === 'discovery') confidenceLevel += 25;
          break;
      }

      return {
        advisorId: advisor.id,
        advisorName: advisor.name,
        recommendation,
        reasoning,
        confidenceLevel: Math.min(100, confidenceLevel)
      };
    });
  }

  /**
   * Generate dynamic political events based on game state
   */
  static generateRandomPoliticalEvent(currentReputation: Reputation, turn: number): PoliticalEvent {
    const eventTypes = ['crisis', 'opportunity', 'diplomatic', 'economic', 'military'] as const;
    const severityLevels = ['low', 'medium', 'high', 'critical'] as const;
    
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];

    // Generate event based on type
    const events: { [key: string]: Partial<PoliticalEvent> } = {
      crisis: {
        title: 'Economic Crisis Looms',
        description: 'Reports indicate a potential economic downturn. Your advisors await your decision on how to respond.',
        consequences: ['Reputation changes', 'Resource impacts', 'Future event triggers']
      },
      opportunity: {
        title: 'Trade Opportunity Emerges',
        description: 'A neighboring kingdom offers a lucrative trade agreement. However, it may affect our existing alliances.',
        consequences: ['Economic benefits', 'Diplomatic implications', 'Advisor opinion changes']
      },
      diplomatic: {
        title: 'Diplomatic Incident',
        description: 'An ambassador from a rival kingdom has been caught spying. How do you respond?',
        consequences: ['International reputation', 'Military tensions', 'Future diplomatic options']
      },
      economic: {
        title: 'Resource Discovery',
        description: 'Scouts have discovered a rich vein of magical crystals in the borderlands. How should we proceed?',
        consequences: ['Resource gains', 'Territorial control', 'Environmental impact']
      },
      military: {
        title: 'Border Skirmish',
        description: 'Enemy forces have been spotted near our borders. Your military advisors request instructions.',
        consequences: ['Military prestige', 'Regional stability', 'Resource allocation']
      }
    };

    const baseEvent = events[eventType];
    
    // Generate choices with consequences
    const choices: PoliticalChoice[] = [
      {
        id: `choice_1_${eventType}`,
        text: 'Take aggressive action',
        consequences: {
          reputation: severity === 'critical' ? 15 : 10,
          resources: { gold: -100, wood: -50 },
          advisorOpinions: { 'general_volkov': 20, 'dr_petrova': -10 },
          futureEvents: ['military_response']
        },
        advisorRecommendations: {}
      },
      {
        id: `choice_2_${eventType}`,
        text: 'Negotiate diplomatically',
        consequences: {
          reputation: 5,
          resources: { gold: 50 },
          advisorOpinions: { 'ambassador_kozlov': 15, 'general_volkov': -5 },
          futureEvents: ['diplomatic_solution']
        },
        advisorRecommendations: {}
      },
      {
        id: `choice_3_${eventType}`,
        text: 'Wait and observe',
        consequences: {
          reputation: -2,
          resources: {},
          advisorOpinions: { 'dr_petrova': 10, 'prof_ivanova': 5 },
          futureEvents: ['delayed_response']
        },
        advisorRecommendations: {}
      }
    ];

    const event: PoliticalEvent = {
      id: `event_${turn}_${eventType}`,
      type: eventType,
      title: baseEvent.title || 'Political Event',
      description: baseEvent.description || 'A significant event requires your attention.',
      choices,
      deadline: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes
      severity,
      consequences: baseEvent.consequences || []
    };

    // Generate advisor recommendations for each choice
    choices.forEach(choice => {
      const recommendations = this.generateAdvisorRecommendations(event, choice);
      choice.advisorRecommendations = {};
      recommendations.forEach(rec => {
        choice.advisorRecommendations[rec.advisorId] = rec.recommendation;
      });
    });

    return event;
  }

  /**
   * Update advisor opinions based on player decisions
   */
  static updateAdvisorOpinions(
    currentAdvisors: PoliticalAdvisor[], 
    choice: PoliticalChoice
  ): PoliticalAdvisor[] {
    return currentAdvisors.map(advisor => {
      const opinionChange = choice.consequences.advisorOpinions[advisor.id] || 0;
      return {
        ...advisor,
        opinion: Math.max(-100, Math.min(100, advisor.opinion + opinionChange))
      };
    });
  }

  /**
   * Calculate overall political stability based on advisor opinions
   */
  static calculatePoliticalStability(advisors: PoliticalAdvisor[]): {
    stability: number; // 0-100
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    concerns: string[];
  } {
    const avgOpinion = advisors.reduce((sum, advisor) => sum + advisor.opinion, 0) / advisors.length;
    const avgInfluence = advisors.reduce((sum, advisor) => sum + advisor.influence, 0) / advisors.length;
    
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

  /**
   * Get advisor recommendations with detailed reasoning
   */
  static getDetailedRecommendations(event: PoliticalEvent): {
    [choiceId: string]: AdvisorRecommendation[];
  } {
    const recommendations: { [choiceId: string]: AdvisorRecommendation[] } = {};
    
    event.choices.forEach(choice => {
      recommendations[choice.id] = this.generateAdvisorRecommendations(event, choice);
    });

    return recommendations;
  }
} 