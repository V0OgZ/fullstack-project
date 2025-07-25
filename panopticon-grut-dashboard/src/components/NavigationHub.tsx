import React, { useState, useEffect } from 'react'
import { ExternalLink, Monitor, Gamepad2, Activity, Settings, Database, TestTube } from 'lucide-react'

interface InterfaceLink {
  id: string
  name: string
  description: string
  port: number
  path: string
  icon: React.ReactNode
  category: 'game' | 'admin' | 'dev' | 'monitoring'
  status: 'active' | 'inactive' | 'unknown'
}

interface NavigationHubProps {
  isVisible: boolean
}

const NavigationHub: React.FC<NavigationHubProps> = ({ isVisible }) => {
  const [interfaces, setInterfaces] = useState<InterfaceLink[]>([])
  const [checkedPorts, setCheckedPorts] = useState<Set<number>>(new Set())

  const interfaceList: InterfaceLink[] = [
    {
      id: 'temporal_engine',
      name: '🏛️ Interface Temporelle',
      description: 'Moteur temporel Heroes of Time - Interface Jean originale',
      port: 8000,
      path: '/',
      icon: <Gamepad2 className="w-5 h-5" />,
      category: 'game',
      status: 'unknown'
    },
    {
      id: 'react_frontend',
      name: '🎮 Frontend React',
      description: 'Interface Heroes moderne avec Canvas 60 FPS et ZFC',
      port: 3000,
      path: '/',
      icon: <Monitor className="w-5 h-5" />,
      category: 'game',
      status: 'unknown'
    },
    {
      id: 'temporal_legendary',
      name: '🌟 Temporal Legendary',
      description: 'Interface temporelle améliorée avec moteur Python',
      port: 5174,
      path: '/',
      icon: <Activity className="w-5 h-5" />,
      category: 'game',
      status: 'unknown'
    },
    {
      id: 'admin_multiplayer',
      name: '👥 Admin Multijoueur',
      description: 'Interface d\'administration pour sessions multijoueur',
      port: 8000,
      path: '/admin-multiplayer.html',
      icon: <Settings className="w-5 h-5" />,
      category: 'admin',
      status: 'unknown'
    },
    {
      id: 'backend_api',
      name: '🔧 Backend API',
      description: 'API Java Spring Boot - Documentation Swagger',
      port: 8080,
      path: '/swagger-ui.html',
      icon: <Database className="w-5 h-5" />,
      category: 'dev',
      status: 'unknown'
    },
    {
      id: 'test_runner',
      name: '🧪 Test Runner',
      description: 'Chaudron de tests - Interface de lancement de tests',
      port: 8888,
      path: '/',
      icon: <TestTube className="w-5 h-5" />,
      category: 'dev',
      status: 'unknown'
    },
    {
      id: 'omega_zero_trilogy',
      name: '🌟 OmégaZero Trilogie',
      description: 'Démo visuelle complète de la trilogie OmégaZero - Combat épique final',
      port: 8000,
      path: '/omega-zero-trilogie-visuelle.html',
      icon: <Activity className="w-5 h-5" />,
      category: 'game',
      status: 'unknown'
    },
    {
      id: 'hots_console',
      name: '⚡ Console HOTS',
      description: 'Console interactive Heroes of Time - Commandes directes',
      port: 8000,
      path: '/hots-console-simple.html',
      icon: <Settings className="w-5 h-5" />,
      category: 'dev',
      status: 'unknown'
    }
  ]

  useEffect(() => {
    if (isVisible) {
      checkInterfaceStatuses()
    }
  }, [isVisible])

  const checkInterfaceStatuses = async () => {
    const updatedInterfaces = [...interfaceList]
    const newCheckedPorts = new Set<number>()
    
    for (const iface of updatedInterfaces) {
      try {
        const response = await fetch(`http://localhost:${iface.port}${iface.path}`, {
          method: 'HEAD',
          mode: 'no-cors'
        })
        
        // En mode no-cors, on ne peut pas lire le status
        // Mais si on arrive ici sans erreur, c'est probablement actif
        iface.status = 'active'
        newCheckedPorts.add(iface.port)
      } catch (error) {
        // Simple check avec GET si HEAD ne marche pas
        try {
          const response = await fetch(`http://localhost:${iface.port}${iface.path}`, {
            method: 'GET',
            mode: 'no-cors'
          })
          iface.status = 'active'
          newCheckedPorts.add(iface.port)
        } catch (e) {
          iface.status = 'inactive'
        }
      }
    }
    
    setInterfaces(updatedInterfaces)
    setCheckedPorts(newCheckedPorts)
  }

  const openInterface = (iface: InterfaceLink) => {
    const url = `http://localhost:${iface.port}${iface.path}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'game': return 'text-blue-400'
      case 'admin': return 'text-yellow-400'
      case 'dev': return 'text-green-400'
      case 'monitoring': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'game': return '🎮'
      case 'admin': return '⚙️'
      case 'dev': return '🔧'
      case 'monitoring': return '📊'
      default: return '📋'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">🟢 Actif</span>
      case 'inactive':
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">🔴 Inactif</span>
      default:
        return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">❓ Inconnu</span>
    }
  }

  if (!isVisible) return null

  const groupedInterfaces = interfaceList.reduce((acc, iface) => {
    if (!acc[iface.category]) {
      acc[iface.category] = []
    }
    acc[iface.category].push(iface)
    return acc
  }, {} as Record<string, InterfaceLink[]>)

  return (
    <div className="space-y-6">
      {/* Header Navigation Hub */}
      <div className="grut-card bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ExternalLink className="w-8 h-8 text-orange-400" />
            <div>
              <h2 className="text-2xl font-bold text-orange-400">🌐 Hub de Navigation</h2>
              <p className="text-grut-text-dim">Interfaces externes • Accès rapide • Status en temps réel</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={checkInterfaceStatuses}
              className="grut-button bg-orange-500 text-white"
            >
              <Activity className="w-4 h-4" />
              Vérifier Status
            </button>
            
            <div className="text-sm text-grut-text-dim">
              {checkedPorts.size} ports vérifiés
            </div>
          </div>
        </div>
      </div>

      {/* Status général */}
      <div className="grut-card">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {interfaceList.filter(i => i.category === 'game').length}
            </div>
            <div className="text-sm text-grut-text-dim">🎮 Interfaces Jeu</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {interfaceList.filter(i => i.category === 'admin').length}
            </div>
            <div className="text-sm text-grut-text-dim">⚙️ Admin</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {interfaceList.filter(i => i.category === 'dev').length}
            </div>
            <div className="text-sm text-grut-text-dim">🔧 Développement</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-grut-primary">
              {interfaces.filter(i => i.status === 'active').length}
            </div>
            <div className="text-sm text-grut-text-dim">✅ Actifs</div>
          </div>
        </div>
      </div>

      {/* Interfaces par catégorie */}
      {Object.entries(groupedInterfaces).map(([category, interfaces]) => (
        <div key={category} className="grut-card">
          <h3 className="text-lg font-semibold text-grut-secondary mb-4 flex items-center gap-2">
            <span className={getCategoryColor(category)}>
              {getCategoryIcon(category)}
            </span>
            {category.charAt(0).toUpperCase() + category.slice(1)}
            <span className="text-sm text-grut-text-dim">({interfaces.length})</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interfaces.map(iface => {
              const currentInterface = interfaceList.find(i => i.id === iface.id)
              const status = currentInterface?.status || 'unknown'
              
              return (
                <div
                  key={iface.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer hover:border-grut-primary/50 ${
                    status === 'active' 
                      ? 'border-grut-border bg-grut-surface hover:bg-grut-primary/10' 
                      : 'border-gray-600 bg-gray-700/30'
                  }`}
                  onClick={() => openInterface(iface)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(category)} bg-current/10`}>
                        {iface.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-grut-text">{iface.name}</h4>
                        <p className="text-sm text-grut-text-dim">:{iface.port}{iface.path}</p>
                      </div>
                    </div>
                    {getStatusBadge(status)}
                  </div>
                  
                  <p className="text-sm text-grut-text-dim mb-3">
                    {iface.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-grut-text-dim font-mono">
                      localhost:{iface.port}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-grut-primary">
                      <ExternalLink className="w-3 h-3" />
                      Ouvrir
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Instructions */}
      <div className="grut-card bg-grut-surface/30">
        <h3 className="text-lg font-semibold text-grut-secondary mb-4">📋 Instructions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-grut-text-dim">
          <div>
            <h4 className="font-semibold text-grut-accent mb-2">Navigation:</h4>
            <ul className="space-y-1">
              <li>• Cliquer sur une interface pour l'ouvrir</li>
              <li>• Les interfaces s'ouvrent dans un nouvel onglet</li>
              <li>• Le status est vérifié automatiquement</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-grut-accent mb-2">Status:</h4>
            <ul className="space-y-1">
              <li>• 🟢 Actif = Service répond aux requêtes</li>
              <li>• 🔴 Inactif = Service non accessible</li>
              <li>• ❓ Inconnu = Status non vérifié</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-orange-400 text-sm">
            <Activity className="w-4 h-4" />
            <span className="font-semibold">Note:</span>
          </div>
          <p className="text-sm text-grut-text-dim mt-1">
            Certaines interfaces peuvent nécessiter des services actifs (backend, frontend). 
            Utiliser <code>./hots start</code> pour démarrer l'environnement complet.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NavigationHub 