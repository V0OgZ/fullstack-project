// 🏛️ Heroes of Time - Phase 4: Perestroika Political System
// Revolutionary political simulation with 4 specialized advisors and dynamic crisis events

import { Position } from './game';

export type AdvisorType = 'military' | 'economic' | 'diplomatic' | 'scientific';
export type CrisisCategory = 'military' | 'economic' | 'diplomatic' | 'scientific';
export type CrisisSeverity = 'minor' | 'moderate' | 'major' | 'catastrophic';
export type ReputationType = 'international' | 'domestic' | 'military' | 'economic' | 'diplomatic';

// 👥 ADVISOR SYSTEM

export interface Advisor {
  id: string;
  name: string;
  type: AdvisorType;
  personality: AdvisorPersonality;
  influence: number; // 0-100 power within the council
  mood: AdvisorMood;
  portrait: string;
  biography: string;
  expertise: string[];
  politicalLeanings: PoliticalAlignment;
  relationships: { [advisorId: string]: number }; // -100 to +100 relationships with other advisors
}

export interface AdvisorPersonality {
  aggression: number; // 0-100 - How aggressive their solutions are
  caution: number; // 0-100 - How risk-averse they are
  pragmatism: number; // 0-100 - How practical vs idealistic
  loyalty: number; // 0-100 - How loyal to the player
  corruption: number; // 0-100 - How prone to self-serving advice
  intelligence: number; // 0-100 - Quality of their analysis
  charisma: number; // 0-100 - Ability to influence others
}

export interface AdvisorMood {
  current: 'pleased' | 'neutral' | 'concerned' | 'angry' | 'furious';
  factors: string[]; // What's affecting their mood
  changeDate: number; // When mood last changed
  stability: number; // How stable their mood is
}

export interface PoliticalAlignment {
  authoritarian: number; // -100 to +100 (liberal to authoritarian)
  economic: number; // -100 to +100 (socialist to capitalist)
  diplomatic: number; // -100 to +100 (isolationist to interventionist)
  military: number; // -100 to +100 (pacifist to militarist)
}

// 🎖️ THE FOUR ADVISORS

export const ADVISORS: Advisor[] = [
  {
    id: 'general_volkov',
    name: 'General Dimitri Volkov',
    type: 'military',
    personality: {
      aggression: 85,
      caution: 25,
      pragmatism: 70,
      loyalty: 90,
      corruption: 20,
      intelligence: 75,
      charisma: 80
    },
    influence: 75,
    mood: {
      current: 'neutral',
      factors: ['awaiting_orders'],
      changeDate: 0,
      stability: 60
    },
    portrait: '/assets/advisors/general_volkov.png',
    biography: 'Veteran of three major conflicts, believes in decisive action and military supremacy. Famous for his quote: "Diplomacy is what you do while reloading."',
    expertise: ['military_strategy', 'unit_combat', 'fortification', 'logistics'],
    politicalLeanings: {
      authoritarian: 60,
      economic: 20,
      diplomatic: -40,
      military: 90
    },
    relationships: {}
  },
  {
    id: 'dr_petrova',
    name: 'Dr. Elena Petrova',
    type: 'economic',
    personality: {
      aggression: 15,
      caution: 90,
      pragmatism: 95,
      loyalty: 85,
      corruption: 10,
      intelligence: 95,
      charisma: 65
    },
    influence: 70,
    mood: {
      current: 'neutral',
      factors: ['analyzing_data'],
      changeDate: 0,
      stability: 85
    },
    portrait: '/assets/advisors/dr_petrova.png',
    biography: 'Former economic minister turned advisor. Believes in careful planning and sustainable growth. Her models predict market trends with 87% accuracy.',
    expertise: ['resource_management', 'trade_optimization', 'economic_forecasting', 'infrastructure'],
    politicalLeanings: {
      authoritarian: -20,
      economic: 40,
      diplomatic: 30,
      military: -30
    },
    relationships: {}
  },
  {
    id: 'ambassador_kozlov',
    name: 'Ambassador Viktor Kozlov',
    type: 'diplomatic',
    personality: {
      aggression: 30,
      caution: 60,
      pragmatism: 80,
      loyalty: 70,
      corruption: 55,
      intelligence: 85,
      charisma: 95
    },
    influence: 80,
    mood: {
      current: 'neutral',
      factors: ['monitoring_relations'],
      changeDate: 0,
      stability: 70
    },
    portrait: '/assets/advisors/ambassador_kozlov.png',
    biography: 'Master diplomat who has negotiated peace treaties and trade agreements across the known world. "Every enemy is a friend who hasn\'t been properly convinced yet."',
    expertise: ['negotiation', 'intelligence_gathering', 'cultural_relations', 'espionage'],
    politicalLeanings: {
      authoritarian: 10,
      economic: 60,
      diplomatic: 85,
      military: 0
    },
    relationships: {}
  },
  {
    id: 'prof_ivanova',
    name: 'Prof. Anya Ivanova',
    type: 'scientific',
    personality: {
      aggression: 20,
      caution: 40,
      pragmatism: 60,
      loyalty: 80,
      corruption: 5,
      intelligence: 98,
      charisma: 45
    },
    influence: 65,
    mood: {
      current: 'neutral',
      factors: ['researching_possibilities'],
      changeDate: 0,
      stability: 90
    },
    portrait: '/assets/advisors/prof_ivanova.png',
    biography: 'Renowned magical researcher and inventor. Believes technology and magic can solve any problem. "Science is just magic with better documentation."',
    expertise: ['magical_research', 'artifact_analysis', 'spell_development', 'technological_innovation'],
    politicalLeanings: {
      authoritarian: -30,
      economic: -20,
      diplomatic: 20,
      military: 10
    },
    relationships: {}
  }
];

// 🎭 CRISIS EVENTS SYSTEM

export interface CrisisEvent {
  id: string;
  title: string;
  category: CrisisCategory;
  severity: CrisisSeverity;
  description: string;
  backgroundInfo: string;
  triggerConditions: CrisisTrigger[];
  timeLimit: number; // Turns before auto-resolution
  decisions: CrisisDecision[];
  advisorReactions: { [advisorId: string]: AdvisorReaction };
  consequences: CrisisConsequence[];
  historicalContext?: string;
  imageUrl?: string;
}

export interface CrisisTrigger {
  type: 'turn_number' | 'resource_level' | 'reputation_threshold' | 'random_event' | 'player_action';
  condition: any;
  probability: number; // 0-1 chance of triggering
}

export interface CrisisDecision {
  id: string;
  title: string;
  description: string;
  advisorSupport: { [advisorId: string]: number }; // -100 to +100 support level
  requirements?: {
    resources?: { [resource: string]: number };
    reputation?: { [type: string]: number };
    advisorInfluence?: { [advisorId: string]: number };
  };
  immediateEffects: DecisionEffect[];
  longTermConsequences: DecisionEffect[];
  probability: number; // 0-1 chance of success
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
}

export interface AdvisorReaction {
  recommendation: string;
  reasoning: string[];
  preferredDecisions: string[]; // Decision IDs in order of preference
  warnings: string[];
  moodImpact: number; // How this crisis affects their mood
  influenceImpact: number; // How this crisis affects their influence
}

export interface CrisisConsequence {
  type: 'reputation_change' | 'resource_change' | 'advisor_influence' | 'new_crisis' | 'permanent_effect';
  target: string;
  value: number | string;
  duration: number; // -1 for permanent
  description: string;
}

export interface DecisionEffect {
  type: 'reputation' | 'resources' | 'advisor_mood' | 'advisor_influence' | 'game_state';
  target: string;
  value: number;
  description: string;
  probability: number; // 0-1 chance of occurring
}

// 🔥 MILITARY CRISIS EVENTS

export const MILITARY_CRISES: CrisisEvent[] = [
  {
    id: 'border_skirmish',
    title: 'Border Skirmish Escalation',
    category: 'military',
    severity: 'moderate',
    description: 'Enemy forces have crossed our border and attacked a border village. Casualties are reported.',
    backgroundInfo: 'This is the third incident this month. Intelligence suggests this may be a probe for a larger invasion.',
    triggerConditions: [
      { type: 'random_event', condition: 'enemy_nearby', probability: 0.3 },
      { type: 'reputation_threshold', condition: 'military_reputation < 50', probability: 0.5 }
    ],
    timeLimit: 3,
    decisions: [
      {
        id: 'immediate_retaliation',
        title: 'Immediate Military Retaliation',
        description: 'Launch a counter-attack immediately to show strength',
        advisorSupport: {
          'general_volkov': 90,
          'dr_petrova': -40,
          'ambassador_kozlov': -20,
          'prof_ivanova': 10
        },
        immediateEffects: [
          { type: 'reputation', target: 'military', value: 15, description: 'Military respects decisive action', probability: 0.8 },
          { type: 'resources', target: 'gold', value: -500, description: 'Military operation costs', probability: 1.0 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'diplomatic', value: -10, description: 'Diplomatic tensions increase', probability: 0.6 }
        ],
        probability: 0.7,
        riskLevel: 'high'
      },
      {
        id: 'defensive_fortification',
        title: 'Strengthen Border Defenses',
        description: 'Fortify the border and wait for the next move',
        advisorSupport: {
          'general_volkov': 40,
          'dr_petrova': 70,
          'ambassador_kozlov': 30,
          'prof_ivanova': 50
        },
        immediateEffects: [
          { type: 'resources', target: 'gold', value: -300, description: 'Fortification costs', probability: 1.0 },
          { type: 'resources', target: 'wood', value: -50, description: 'Construction materials', probability: 1.0 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'domestic', value: 5, description: 'Citizens feel safer', probability: 0.8 }
        ],
        probability: 0.9,
        riskLevel: 'low'
      },
      {
        id: 'diplomatic_protest',
        title: 'Diplomatic Protest',
        description: 'Lodge a formal complaint through diplomatic channels',
        advisorSupport: {
          'general_volkov': -60,
          'dr_petrova': 20,
          'ambassador_kozlov': 85,
          'prof_ivanova': 30
        },
        immediateEffects: [
          { type: 'reputation', target: 'diplomatic', value: 10, description: 'Shows diplomatic maturity', probability: 0.7 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'military', value: -5, description: 'Military questions leadership', probability: 0.4 }
        ],
        probability: 0.6,
        riskLevel: 'medium'
      }
    ],
    advisorReactions: {
      'general_volkov': {
        recommendation: 'Strike back immediately and show them our strength!',
        reasoning: ['Weakness invites aggression', 'Our military needs to prove itself', 'Border security is paramount'],
        preferredDecisions: ['immediate_retaliation', 'defensive_fortification', 'diplomatic_protest'],
        warnings: ['If we appear weak, they will attack again', 'The military needs to see decisive leadership'],
        moodImpact: -10,
        influenceImpact: 5
      },
      'dr_petrova': {
        recommendation: 'Consider the economic cost of military action carefully',
        reasoning: ['War is expensive', 'We should focus on defense', 'Economic stability is crucial'],
        preferredDecisions: ['defensive_fortification', 'diplomatic_protest', 'immediate_retaliation'],
        warnings: ['Military campaigns drain our treasury', 'Economic consequences could be severe'],
        moodImpact: -5,
        influenceImpact: 0
      },
      'ambassador_kozlov': {
        recommendation: 'This is an opportunity to demonstrate diplomatic prowess',
        reasoning: ['Violence breeds violence', 'Diplomatic solutions are lasting', 'We can gain international support'],
        preferredDecisions: ['diplomatic_protest', 'defensive_fortification', 'immediate_retaliation'],
        warnings: ['Military action could escalate beyond control', 'We risk international condemnation'],
        moodImpact: 0,
        influenceImpact: 10
      },
      'prof_ivanova': {
        recommendation: 'Analyze the situation scientifically before acting',
        reasoning: ['We need more data', 'Technology could provide solutions', 'Rushed decisions lead to mistakes'],
        preferredDecisions: ['defensive_fortification', 'diplomatic_protest', 'immediate_retaliation'],
        warnings: ['Acting without full information is dangerous', 'There may be unconsidered factors'],
        moodImpact: -3,
        influenceImpact: 0
      }
    },
    consequences: [],
    historicalContext: 'Similar border conflicts have historically led to major wars if not handled carefully.'
  },
  {
    id: 'mercenary_uprising',
    title: 'Mercenary Wage Revolt',
    category: 'military',
    severity: 'major',
    description: 'Hired mercenaries are demanding double their contracted wages and threatening to switch sides.',
    backgroundInfo: 'Our mercenary companies make up 40% of our military force. Losing them would be catastrophic.',
    triggerConditions: [
      { type: 'resource_level', condition: 'gold < 1000', probability: 0.4 },
      { type: 'turn_number', condition: 'turn > 10', probability: 0.2 }
    ],
    timeLimit: 2,
    decisions: [
      {
        id: 'pay_demands',
        title: 'Meet Their Demands',
        description: 'Pay the increased wages to maintain military strength',
        advisorSupport: {
          'general_volkov': 75,
          'dr_petrova': -50,
          'ambassador_kozlov': 40,
          'prof_ivanova': 10
        },
        immediateEffects: [
          { type: 'resources', target: 'gold', value: -800, description: 'Increased mercenary wages', probability: 1.0 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'military', value: 10, description: 'Military morale improves', probability: 0.9 }
        ],
        probability: 0.95,
        riskLevel: 'low'
      },
      {
        id: 'replace_mercenaries',
        title: 'Replace with Regular Troops',
        description: 'Dismiss mercenaries and recruit regular soldiers',
        advisorSupport: {
          'general_volkov': 30,
          'dr_petrova': 60,
          'ambassador_kozlov': 20,
          'prof_ivanova': 40
        },
        immediateEffects: [
          { type: 'game_state', target: 'military_strength', value: -30, description: 'Temporary weakness', probability: 1.0 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'domestic', value: 15, description: 'Citizens prefer regular army', probability: 0.8 }
        ],
        probability: 0.7,
        riskLevel: 'high'
      },
      {
        id: 'negotiate_compromise',
        title: 'Negotiate a Compromise',
        description: 'Offer partial wage increase plus other benefits',
        advisorSupport: {
          'general_volkov': 50,
          'dr_petrova': 70,
          'ambassador_kozlov': 90,
          'prof_ivanova': 60
        },
        immediateEffects: [
          { type: 'resources', target: 'gold', value: -400, description: 'Compromise wage increase', probability: 1.0 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'diplomatic', value: 5, description: 'Shows negotiation skills', probability: 0.6 }
        ],
        probability: 0.8,
        riskLevel: 'medium'
      }
    ],
    advisorReactions: {
      'general_volkov': {
        recommendation: 'Pay them what they ask - we cannot afford to lose our military strength',
        reasoning: ['Military strength is our foundation', 'Mercenaries are experienced fighters', 'Weakness invites invasion'],
        preferredDecisions: ['pay_demands', 'negotiate_compromise', 'replace_mercenaries'],
        warnings: ['Without mercenaries, we are vulnerable', 'Regular troops take time to train'],
        moodImpact: -15,
        influenceImpact: 0
      },
      'dr_petrova': {
        recommendation: 'This is unsustainable economically - we need a different approach',
        reasoning: ['Our budget cannot handle these demands', 'Regular troops are more cost-effective', 'Economic stability is crucial'],
        preferredDecisions: ['replace_mercenaries', 'negotiate_compromise', 'pay_demands'],
        warnings: ['This will bankrupt us', 'Other expenses will have to be cut'],
        moodImpact: -10,
        influenceImpact: 5
      },
      'ambassador_kozlov': {
        recommendation: 'This is a negotiation - let me handle it diplomatically',
        reasoning: ['Everything is negotiable', 'We can find a middle ground', 'Relationships matter more than money'],
        preferredDecisions: ['negotiate_compromise', 'pay_demands', 'replace_mercenaries'],
        warnings: ['Harsh actions will affect our reputation', 'Mercenaries have connections'],
        moodImpact: 0,
        influenceImpact: 10
      },
      'prof_ivanova': {
        recommendation: 'Perhaps we can offer technological advantages instead of just money',
        reasoning: ['Innovation can replace brute force', 'Technology multiplies effectiveness', 'There are creative solutions'],
        preferredDecisions: ['negotiate_compromise', 'replace_mercenaries', 'pay_demands'],
        warnings: ['Military solutions are temporary', 'We need long-term thinking'],
        moodImpact: -5,
        influenceImpact: 0
      }
    },
    consequences: [],
    historicalContext: 'Mercenary revolts have toppled kingdoms when not handled properly.'
  }
];

// 💰 ECONOMIC CRISIS EVENTS

export const ECONOMIC_CRISES: CrisisEvent[] = [
  {
    id: 'resource_shortage',
    title: 'Critical Resource Shortage',
    category: 'economic',
    severity: 'major',
    description: 'A drought has severely reduced our wood and food production. Citizens are beginning to worry.',
    backgroundInfo: 'This is the worst drought in 50 years. Our reserves will last only 2-3 months.',
    triggerConditions: [
      { type: 'random_event', condition: 'natural_disaster', probability: 0.15 },
      { type: 'resource_level', condition: 'wood < 100', probability: 0.3 }
    ],
    timeLimit: 4,
    decisions: [
      {
        id: 'emergency_rationing',
        title: 'Implement Emergency Rationing',
        description: 'Strictly control resource distribution to maximize efficiency',
        advisorSupport: {
          'general_volkov': 70,
          'dr_petrova': 85,
          'ambassador_kozlov': 30,
          'prof_ivanova': 60
        },
        immediateEffects: [
          { type: 'reputation', target: 'domestic', value: -15, description: 'Citizens unhappy with restrictions', probability: 0.9 }
        ],
        longTermConsequences: [
          { type: 'resources', target: 'wood', value: 50, description: 'Rationing preserves resources', probability: 0.8 }
        ],
        probability: 0.85,
        riskLevel: 'medium'
      },
      {
        id: 'trade_for_resources',
        title: 'Emergency Trade Missions',
        description: 'Send traders to neighboring lands to purchase resources at premium prices',
        advisorSupport: {
          'general_volkov': 40,
          'dr_petrova': 60,
          'ambassador_kozlov': 90,
          'prof_ivanova': 50
        },
        immediateEffects: [
          { type: 'resources', target: 'gold', value: -600, description: 'Premium prices for emergency trade', probability: 1.0 },
          { type: 'resources', target: 'wood', value: 100, description: 'Purchased resources', probability: 0.7 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'diplomatic', value: 10, description: 'Strengthens trade relationships', probability: 0.6 }
        ],
        probability: 0.7,
        riskLevel: 'high'
      },
      {
        id: 'magical_solutions',
        title: 'Magical Resource Creation',
        description: 'Use magic to attempt to create or find new resources',
        advisorSupport: {
          'general_volkov': 20,
          'dr_petrova': 40,
          'ambassador_kozlov': 30,
          'prof_ivanova': 95
        },
        requirements: {
          reputation: { 'scientific': 30 }
        },
        immediateEffects: [
          { type: 'resources', target: 'mana', value: -100, description: 'Magical energy consumed', probability: 1.0 }
        ],
        longTermConsequences: [
          { type: 'resources', target: 'wood', value: 150, description: 'Magically created resources', probability: 0.6 }
        ],
        probability: 0.6,
        riskLevel: 'extreme'
      }
    ],
    advisorReactions: {
      'general_volkov': {
        recommendation: 'Discipline and order will get us through this crisis',
        reasoning: ['Military discipline works in civilian life', 'Rationing is proven effective', 'We must maintain order'],
        preferredDecisions: ['emergency_rationing', 'trade_for_resources', 'magical_solutions'],
        warnings: ['Chaos will follow if we lose control', 'Citizens need strong leadership'],
        moodImpact: -5,
        influenceImpact: 0
      },
      'dr_petrova': {
        recommendation: 'This is exactly the type of crisis economic planning prevents',
        reasoning: ['We need systematic resource management', 'Data-driven decisions are crucial', 'Economic efficiency is key'],
        preferredDecisions: ['emergency_rationing', 'trade_for_resources', 'magical_solutions'],
        warnings: ['Poor resource management could lead to societal collapse', 'We need long-term planning'],
        moodImpact: -20,
        influenceImpact: 15
      },
      'ambassador_kozlov': {
        recommendation: 'Our diplomatic relationships can save us',
        reasoning: ['Allies will help in times of need', 'Trade relationships are invaluable', 'International cooperation is key'],
        preferredDecisions: ['trade_for_resources', 'emergency_rationing', 'magical_solutions'],
        warnings: ['Isolation will make this worse', 'We need to maintain international goodwill'],
        moodImpact: 0,
        influenceImpact: 5
      },
      'prof_ivanova': {
        recommendation: 'This is why we invest in magical research - for exactly these situations',
        reasoning: ['Magic can solve resource problems', 'Scientific advancement prevents crises', 'Innovation is the answer'],
        preferredDecisions: ['magical_solutions', 'emergency_rationing', 'trade_for_resources'],
        warnings: ['Traditional methods are insufficient', 'We need breakthrough solutions'],
        moodImpact: 10,
        influenceImpact: 20
      }
    },
    consequences: [],
    historicalContext: 'The Great Famine of 1342 was caused by similar resource shortages and led to the fall of the Eldorian Empire.'
  }
];

// 🤝 DIPLOMATIC CRISIS EVENTS

export const DIPLOMATIC_CRISES: CrisisEvent[] = [
  {
    id: 'alliance_betrayal',
    title: 'Allied Betrayal Discovered',
    category: 'diplomatic',
    severity: 'major',
    description: 'Intelligence reports reveal that our trusted ally has been secretly negotiating with our enemies.',
    backgroundInfo: 'Documents obtained by our spies show plans to attack us within the next 5 turns.',
    triggerConditions: [
      { type: 'turn_number', condition: 'turn > 15', probability: 0.2 },
      { type: 'reputation_threshold', condition: 'diplomatic_reputation > 60', probability: 0.3 }
    ],
    timeLimit: 3,
    decisions: [
      {
        id: 'preemptive_strike',
        title: 'Preemptive Military Strike',
        description: 'Strike first before they can betray us',
        advisorSupport: {
          'general_volkov': 95,
          'dr_petrova': 10,
          'ambassador_kozlov': -80,
          'prof_ivanova': 20
        },
        immediateEffects: [
          { type: 'reputation', target: 'military', value: 20, description: 'Military approves decisive action', probability: 0.9 },
          { type: 'reputation', target: 'diplomatic', value: -30, description: 'International condemnation', probability: 0.8 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'international', value: -25, description: 'Seen as untrustworthy', probability: 0.7 }
        ],
        probability: 0.8,
        riskLevel: 'extreme'
      },
      {
        id: 'diplomatic_confrontation',
        title: 'Diplomatic Confrontation',
        description: 'Confront them diplomatically with the evidence',
        advisorSupport: {
          'general_volkov': 30,
          'dr_petrova': 70,
          'ambassador_kozlov': 90,
          'prof_ivanova': 80
        },
        immediateEffects: [
          { type: 'reputation', target: 'diplomatic', value: 15, description: 'Shows diplomatic maturity', probability: 0.7 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'international', value: 10, description: 'International community approves', probability: 0.6 }
        ],
        probability: 0.6,
        riskLevel: 'medium'
      },
      {
        id: 'counter_espionage',
        title: 'Counter-Intelligence Operation',
        description: 'Feed them false information and monitor their activities',
        advisorSupport: {
          'general_volkov': 70,
          'dr_petrova': 50,
          'ambassador_kozlov': 85,
          'prof_ivanova': 90
        },
        immediateEffects: [
          { type: 'resources', target: 'gold', value: -200, description: 'Intelligence operations cost', probability: 1.0 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'diplomatic', value: 20, description: 'Masterful diplomatic maneuvering', probability: 0.5 }
        ],
        probability: 0.5,
        riskLevel: 'high'
      }
    ],
    advisorReactions: {
      'general_volkov': {
        recommendation: 'Strike first - it\'s the only way to guarantee our survival',
        reasoning: ['They are planning to attack us', 'Military advantage goes to the aggressor', 'Betrayal cannot be tolerated'],
        preferredDecisions: ['preemptive_strike', 'counter_espionage', 'diplomatic_confrontation'],
        warnings: ['They will attack us if we hesitate', 'Military readiness is crucial'],
        moodImpact: -25,
        influenceImpact: 20
      },
      'dr_petrova': {
        recommendation: 'War is expensive - let\'s explore other options first',
        reasoning: ['Military action is costly', 'Economic relationships matter', 'We need to consider all consequences'],
        preferredDecisions: ['diplomatic_confrontation', 'counter_espionage', 'preemptive_strike'],
        warnings: ['War will devastate our economy', 'We need to think about the costs'],
        moodImpact: -15,
        influenceImpact: 5
      },
      'ambassador_kozlov': {
        recommendation: 'This is a diplomatic crisis requiring a diplomatic solution',
        reasoning: ['Violence will only make things worse', 'Diplomacy can resolve anything', 'International opinion matters'],
        preferredDecisions: ['diplomatic_confrontation', 'counter_espionage', 'preemptive_strike'],
        warnings: ['Military action will destroy our reputation', 'We need allies more than enemies'],
        moodImpact: -20,
        influenceImpact: 25
      },
      'prof_ivanova': {
        recommendation: 'Intelligence warfare is more effective than military warfare',
        reasoning: ['Information is power', 'Scientific methods work in espionage', 'Smart tactics beat brute force'],
        preferredDecisions: ['counter_espionage', 'diplomatic_confrontation', 'preemptive_strike'],
        warnings: ['Simple solutions rarely work', 'We need to outthink them'],
        moodImpact: 5,
        influenceImpact: 10
      }
    },
    consequences: [],
    historicalContext: 'The War of Broken Oaths began when King Aldric struck preemptively against his betraying allies.'
  }
];

// 🔬 SCIENTIFIC CRISIS EVENTS

export const SCIENTIFIC_CRISES: CrisisEvent[] = [
  {
    id: 'magical_discovery',
    title: 'Revolutionary Magical Discovery',
    category: 'scientific',
    severity: 'moderate',
    description: 'Our researchers have discovered a new form of magic that could revolutionize warfare, but it\'s dangerous.',
    backgroundInfo: 'Initial tests show 300% increase in spell power, but with unknown side effects.',
    triggerConditions: [
      { type: 'reputation_threshold', condition: 'scientific_reputation > 70', probability: 0.4 },
      { type: 'random_event', condition: 'magical_research', probability: 0.2 }
    ],
    timeLimit: 4,
    decisions: [
      {
        id: 'full_research',
        title: 'Full Research Program',
        description: 'Commit all resources to understanding this discovery',
        advisorSupport: {
          'general_volkov': 80,
          'dr_petrova': 40,
          'ambassador_kozlov': 60,
          'prof_ivanova': 95
        },
        immediateEffects: [
          { type: 'resources', target: 'gold', value: -400, description: 'Research funding', probability: 1.0 },
          { type: 'resources', target: 'mana', value: -50, description: 'Magical experiments', probability: 1.0 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'scientific', value: 25, description: 'Scientific breakthrough', probability: 0.7 }
        ],
        probability: 0.7,
        riskLevel: 'high'
      },
      {
        id: 'limited_testing',
        title: 'Limited Safe Testing',
        description: 'Proceed cautiously with minimal risk',
        advisorSupport: {
          'general_volkov': 40,
          'dr_petrova': 90,
          'ambassador_kozlov': 70,
          'prof_ivanova': 70
        },
        immediateEffects: [
          { type: 'resources', target: 'gold', value: -200, description: 'Limited research', probability: 1.0 }
        ],
        longTermConsequences: [
          { type: 'reputation', target: 'scientific', value: 10, description: 'Cautious progress', probability: 0.9 }
        ],
        probability: 0.9,
        riskLevel: 'low'
      },
      {
        id: 'suppress_discovery',
        title: 'Suppress the Discovery',
        description: 'Too dangerous - lock away the research',
        advisorSupport: {
          'general_volkov': 10,
          'dr_petrova': 60,
          'ambassador_kozlov': 50,
          'prof_ivanova': -70
        },
        immediateEffects: [
          { type: 'reputation', target: 'scientific', value: -20, description: 'Scientists disappointed', probability: 0.8 }
        ],
        longTermConsequences: [
          { type: 'advisor_influence', target: 'prof_ivanova', value: -15, description: 'Ivanova loses influence', probability: 1.0 }
        ],
        probability: 0.95,
        riskLevel: 'low'
      }
    ],
    advisorReactions: {
      'general_volkov': {
        recommendation: 'Military applications could give us decisive advantage',
        reasoning: ['New weapons win wars', 'Military strength is paramount', 'Risk is acceptable for victory'],
        preferredDecisions: ['full_research', 'limited_testing', 'suppress_discovery'],
        warnings: ['Enemies might discover it first', 'Military advantage is temporary'],
        moodImpact: 5,
        influenceImpact: 0
      },
      'dr_petrova': {
        recommendation: 'The economic risks must be carefully evaluated',
        reasoning: ['Unknown costs are dangerous', 'Economic stability is crucial', 'Risk management is essential'],
        preferredDecisions: ['limited_testing', 'suppress_discovery', 'full_research'],
        warnings: ['This could bankrupt us', 'Economic consequences are unpredictable'],
        moodImpact: -10,
        influenceImpact: 0
      },
      'ambassador_kozlov': {
        recommendation: 'Consider the diplomatic implications of magical weapons',
        reasoning: ['International treaties may be affected', 'Allies might feel threatened', 'Diplomatic consequences matter'],
        preferredDecisions: ['limited_testing', 'suppress_discovery', 'full_research'],
        warnings: ['This could start an arms race', 'International relations will suffer'],
        moodImpact: -5,
        influenceImpact: 0
      },
      'prof_ivanova': {
        recommendation: 'This is the breakthrough we\'ve been waiting for!',
        reasoning: ['Scientific advancement is essential', 'Knowledge should not be suppressed', 'Innovation drives progress'],
        preferredDecisions: ['full_research', 'limited_testing', 'suppress_discovery'],
        warnings: ['Suppressing knowledge is dangerous', 'We cannot let fear stop progress'],
        moodImpact: 20,
        influenceImpact: 15
      }
    },
    consequences: [],
    historicalContext: 'The discovery of gunpowder changed the balance of power permanently.'
  }
];

// 🏛️ REPUTATION SYSTEM

export interface ReputationSystem {
  international: number; // -100 to +100
  domestic: number; // -100 to +100
  military: number; // -100 to +100
  economic: number; // -100 to +100
  diplomatic: number; // -100 to +100
  scientific: number; // -100 to +100
}

export interface ReputationEffect {
  type: ReputationType;
  value: number;
  reason: string;
  timestamp: number;
  decay: number; // How much it decays per turn
}

// 🎯 POLITICAL SYSTEM MANAGER

export interface PoliticalSystemState {
  advisors: Advisor[];
  currentCrisis: CrisisEvent | null;
  crisisHistory: CrisisEvent[];
  reputation: ReputationSystem;
  reputationHistory: ReputationEffect[];
  advisorInfluenceHistory: { [advisorId: string]: number[] };
  decisionHistory: { crisisId: string; decisionId: string; outcome: string }[];
  turnsUntilNextCrisis: number;
  crisisQueue: CrisisEvent[];
}

export interface PoliticalSystemManager {
  // Crisis management
  generateCrisis(): CrisisEvent;
  resolveCrisis(crisisId: string, decisionId: string): CrisisConsequence[];
  
  // Advisor management
  updateAdvisorMood(advisorId: string, crisisId: string, decisionId: string): void;
  updateAdvisorInfluence(advisorId: string, change: number): void;
  getAdvisorRecommendation(advisorId: string, crisisId: string): AdvisorReaction;
  
  // Reputation management
  updateReputation(effects: ReputationEffect[]): void;
  getReputationTrend(type: ReputationType): number;
  
  // Decision support
  calculateDecisionOutcome(crisisId: string, decisionId: string): DecisionOutcome;
  getAdvisorConsensus(crisisId: string): AdvisorConsensus;
}

export interface DecisionOutcome {
  success: boolean;
  immediateEffects: DecisionEffect[];
  longTermConsequences: DecisionEffect[];
  advisorReactions: { [advisorId: string]: number }; // Mood changes
  description: string;
}

export interface AdvisorConsensus {
  agreement: number; // 0-100 how much advisors agree
  majorityDecision: string | null;
  conflictLevel: number; // 0-100 how much conflict exists
  influenceWeightedRecommendation: string | null;
}

// 🎮 COMPLETE PHASE 4 IMPLEMENTATION

export const ALL_CRISIS_EVENTS: CrisisEvent[] = [
  ...MILITARY_CRISES,
  ...ECONOMIC_CRISES,
  ...DIPLOMATIC_CRISES,
  ...SCIENTIFIC_CRISES
];

export default {
  ADVISORS,
  ALL_CRISIS_EVENTS,
  MILITARY_CRISES,
  ECONOMIC_CRISES,
  DIPLOMATIC_CRISES,
  SCIENTIFIC_CRISES,
  AdvisorType,
  CrisisCategory,
  CrisisSeverity,
  ReputationType
}; 