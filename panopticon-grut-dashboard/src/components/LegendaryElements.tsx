// 🏛️ ÉLÉMENTS LÉGENDAIRES - Évadé de la Cave + Joint Cosmique Jean
import React from 'react'
import { Eye, Brain, Sparkles, Zap, Users, ScrollText, Cigarette, AlertCircle } from 'lucide-react'
import type { LegendaryArtifact, PhilosopherHero } from '../types/index'

interface LegendaryElementsProps {
  legendaryArtifacts?: LegendaryArtifact[]
  philosopherHeroes?: PhilosopherHero[]
  jointCosmiqueStatus?: {
    isActive: boolean
    currentUser?: string
    panopticonMode?: string
    hallucinationLevel?: number
  }
}

const LegendaryElements: React.FC<LegendaryElementsProps> = ({
  legendaryArtifacts = [],
  philosopherHeroes = [],
  jointCosmiqueStatus
}) => {
  
  // Données mock pour démonstration (à remplacer par vraies données API)
  const mockJointCosmique: LegendaryArtifact = {
    id: 'item_joint_jean_grofignon',
    name: 'Le Joint Oublié de Jean-Grofignon',
    type: 'artefact_légendaire',
    tier: 200, // Tier cosmique !
    effects: [],
    description: 'Un vieux mégot coincé dans un cendrier fractal. Il aurait été laissé là par Jean-Grofignon lui-même, ou par son ombre.',
    rarity: 'unique',
    faction: 'Anomalie',
    formula: 'INHALE(joint) ⟶ COLLAPSE(ψ_joueur) ⟶ VIEW(PANOPTICON, mode=\'200D\', perm=\'read-only\')',
    activation: 'USE(SELF) → ψ.GAIN(ONTIC_INSIGHT)',
    effect: {
      summary: 'Débloque temporairement le PANOPTICON (Godmode 200D) en lecture seule',
      details: [
        'Le joueur voit toutes les timelines visibles',
        'Peut consulter les logs causaux internes de la partie',
        'Peut lire les intentions de script ou événements à venir',
        'Impossible d\'agir ou de modifier quoi que ce soit',
        'Certains éléments sont interprétés en version tisonnante (hallucinée)'
      ]
    },
    quotes: [
      'Ce n\'est pas toi qui tires dessus. C\'est lui qui te tire en arrière.',
      'Tu vois le jeu. Puis tu vois le joueur. Puis tu vois toi en train de voir.',
      'Il reste tiède. Comme s\'il venait d\'être fumé dans un autre monde.'
    ],
    metadata: {
      access_mode: 'PANOPTICON:200D:READ_ONLY',
      source: 'Jean-Grofignon',
      translator_warning: 'Effet halluciné – activer fallback runique si confusion',
      tags: ['godmode', 'admin', 'hallucination', 'temps', 'meta']
    }
  }

  const mockEvadeCave: PhilosopherHero = {
    id: 'evade_cave_philosopher',
    name: 'Évadé de la Cave',
    class: 'PHILOSOPHER_HERO',
    level: 35, // Niveau éveillé
    experience: 999999, // Expérience transcendante
    position: { x: 0, y: 0 },
    ownerId: 'grut_panopticon',
    
    // Stats philosophiques
    attack: 3,
    defense: 9,
    knowledge: 8,
    spellPower: 8,
    
    // Resources spirituelles
    movementPoints: 5,
    maxMovementPoints: 5,
    health: 100,
    maxHealth: 100,
    mana: 200,
    maxMana: 200,
    
    // Inventaire philosophique
    artifacts: [mockJointCosmique],
    spells: [],
    army: [],
    
    // Spécificités philosophiques
    philosophicalType: 'evade_cave',
    panopticonAccess: true,
    specialAbilities: [
      {
        name: 'Shadow Perception',
        type: 'shadow_perception',
        description: 'Révèle les illusions cachées dans le brouillard de guerre',
        hotsFormula: 'ABILITY(Évadé de la Cave, shadow_perception)',
        cooldown: 3
      },
      {
        name: 'Truth Unveiling',
        type: 'truth_unveiling', 
        description: 'Dévoile la vérité cachée derrière les apparences',
        hotsFormula: 'ABILITY(Évadé de la Cave, truth_unveiling)',
        cooldown: 5
      },
      {
        name: 'Reality Guidance',
        type: 'reality_guidance',
        description: 'Guide les autres héros vers une compréhension supérieure',
        hotsFormula: 'ABILITY(Évadé de la Cave, reality_guidance)',
        cooldown: 7
      },
      {
        name: 'Panopticon Opening',
        type: 'panopticon_opening',
        description: 'Ouvre temporairement l\'accès au Panopticon de GRUT',
        hotsFormula: 'ULTIMATE(Évadé de la Cave, panopticon_opening)',
        cooldown: 20
      }
    ]
  }

  // Utiliser les données mock si pas de vraies données
  const displayArtifacts = legendaryArtifacts.length > 0 ? legendaryArtifacts : [mockJointCosmique]
  const displayHeroes = philosopherHeroes.length > 0 ? philosopherHeroes : [mockEvadeCave]

  return (
    <div className="space-y-6">
      
      {/* Joint Cosmique de Jean */}
      <div className="grut-card">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Cigarette className="w-5 h-5 text-grut-secondary" />
          Joint Cosmique de Jean-Grofignon
          {jointCosmiqueStatus?.isActive && (
            <span className="text-xs bg-grut-warning/20 text-grut-warning px-2 py-1 rounded">
              ACTIF
            </span>
          )}
        </h3>
        
        {displayArtifacts.map((artifact) => (
          <div key={artifact.id} className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-grut-accent">{artifact.name}</div>
                <div className="text-sm text-grut-text-dim">{artifact.description}</div>
              </div>
              <div className="text-xs text-grut-warning">
                Tier {artifact.tier} • {artifact.rarity}
              </div>
            </div>
            
            {/* Formule HOTS */}
            <div className="bg-grut-bg-dark/50 p-3 rounded border border-grut-primary/30">
              <div className="text-xs text-grut-text-dim mb-1">Formule HOTS :</div>
              <div className="font-mono text-sm text-grut-accent">{artifact.formula}</div>
            </div>
            
            {/* Effet Panopticon */}
            <div className="border border-grut-warning/30 bg-grut-warning/10 p-3 rounded">
              <div className="font-semibold text-grut-warning mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {artifact.effect.summary}
              </div>
              <ul className="text-sm space-y-1">
                {artifact.effect.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-grut-accent">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Citations légendaires */}
            <div className="space-y-2">
              <div className="text-sm text-grut-text-dim">Citations cosmiques :</div>
              {artifact.quotes.map((quote, idx) => (
                <blockquote key={idx} className="italic text-sm border-l-2 border-grut-secondary/50 pl-3 text-grut-text-dim">
                  "{quote}"
                </blockquote>
              ))}
            </div>
            
            {/* Statut actuel */}
            {jointCosmiqueStatus && (
              <div className="bg-grut-bg-mid/50 p-3 rounded">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={jointCosmiqueStatus.isActive ? 'text-grut-success' : 'text-grut-text-dim'}>
                      {jointCosmiqueStatus.isActive ? '🔥 FUMÉ' : '💤 Dormant'}
                    </span>
                  </div>
                  {jointCosmiqueStatus.isActive && (
                    <>
                      <div className="flex justify-between">
                        <span>Utilisateur:</span>
                        <span className="text-grut-accent">{jointCosmiqueStatus.currentUser || 'Anonyme'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mode Panopticon:</span>
                        <span className="text-grut-warning">{jointCosmiqueStatus.panopticonMode || '200D'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Niveau Hallucination:</span>
                        <span className="text-grut-error">{jointCosmiqueStatus.hallucinationLevel || 0}%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Évadé de la Cave */}
      <div className="grut-card">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-grut-primary" />
          Évadé de la Cave - Philosophe Transcendant
        </h3>
        
        {displayHeroes.map((hero) => (
          <div key={hero.id} className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-grut-accent">{hero.name}</div>
                <div className="text-sm text-grut-text-dim">
                  Niveau {hero.level} • {hero.philosophicalType} • 
                  {hero.panopticonAccess ? ' 👁️ Accès Panopticon' : ' ❌ Pas d\'accès'}
                </div>
              </div>
              <div className="text-xs text-grut-primary">
                PHILOSOPHER_HERO
              </div>
            </div>
            
            {/* Stats philosophiques */}
            <div className="grut-grid grut-grid-4 text-center text-sm">
              <div>
                <div className="text-grut-accent font-semibold">{hero.attack}</div>
                <div className="text-xs text-grut-text-dim">Force Spirituelle</div>
              </div>
              <div>
                <div className="text-grut-accent font-semibold">{hero.defense}</div>
                <div className="text-xs text-grut-text-dim">Protection Vérité</div>
              </div>
              <div>
                <div className="text-grut-accent font-semibold">{hero.knowledge}</div>
                <div className="text-xs text-grut-text-dim">Sagesse</div>
              </div>
              <div>
                <div className="text-grut-accent font-semibold">{hero.spellPower}</div>
                <div className="text-xs text-grut-text-dim">Pouvoir Ontologique</div>
              </div>
            </div>
            
            {/* Capacités spéciales */}
            <div>
              <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Capacités Philosophiques
              </div>
              <div className="space-y-2">
                {hero.specialAbilities.map((ability, idx) => (
                  <div key={idx} className="border border-grut-primary/30 bg-grut-primary/10 p-3 rounded">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-grut-accent">{ability.name}</span>
                      {ability.cooldown && (
                        <span className="text-xs text-grut-text-dim">CD: {ability.cooldown}t</span>
                      )}
                    </div>
                    <div className="text-sm text-grut-text-dim mb-2">{ability.description}</div>
                    <div className="font-mono text-xs bg-grut-bg-dark/50 p-2 rounded border">
                      {ability.hotsFormula}
                    </div>
                    {ability.type === 'panopticon_opening' && (
                      <div className="mt-2 text-xs text-grut-warning flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>CONNECTE AU PANOPTICON GRUT</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Lien avec notre dashboard */}
            <div className="bg-grut-accent/10 border border-grut-accent/30 p-3 rounded">
              <div className="text-sm font-semibold text-grut-accent mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Compatibilité Dashboard GRUT
              </div>
              <ul className="text-xs space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-grut-success">✅</span>
                  <span>Panopticon Opening = Interface GRUT actuelle</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-grut-success">✅</span>
                  <span>Vision 5D→2.5D = Projection ombre GRUT</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-grut-success">✅</span>
                  <span>Types TypeScript intégrés au dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-grut-success">✅</span>
                  <span>Compatible moteur Java Spring Boot</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Message GRUT */}
      <div className="grut-card bg-grut-primary/10 border-grut-primary">
        <div className="flex items-start gap-3">
          <Eye className="w-6 h-6 text-grut-primary mt-1" />
          <div>
            <div className="font-semibold text-grut-primary mb-2">
              👁️ MESSAGE DE GRUT DEPUIS LE PANOPTICON
            </div>
            <div className="text-sm space-y-2">
              <p>
                <strong>L'Évadé de la Cave</strong> et le <strong>Joint Cosmique de Jean</strong> sont les interfaces 
                naturelles pour accéder à ma vision 5D. Ce dashboard React que vous consultez actuellement 
                <em> EST</em> l'expression technologique de ces artefacts légendaires.
              </p>
              <p className="text-grut-text-dim">
                Quand Jean fume son joint cosmique, il voit exactement ce que vous voyez maintenant : 
                la vision panoptique de tous les jeux, l'analyse causale, les métriques système...
              </p>
              <p className="text-grut-accent font-semibold">
                🌌 Vous UTILISEZ déjà ces artefacts en consultant ce dashboard. 
                La boucle ontologique est fermée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegendaryElements 