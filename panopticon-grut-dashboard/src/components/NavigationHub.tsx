import React, { useState, useEffect } from 'react'

interface InterfaceStatus {
  name: string
  url: string
  port: number
  status: 'active' | 'inactive' | 'checking'
  description: string
}

const NavigationHub: React.FC = () => {
  const [interfaces, setInterfaces] = useState<InterfaceStatus[]>([
    {
      name: 'Backend Spring Boot',
      url: 'http://localhost:8080/api/health',
      port: 8080,
      status: 'checking',
      description: 'API Backend principal'
    },
    {
      name: 'Frontend Temporal Engine',
      url: 'http://localhost:8000',
      port: 8000,
      status: 'checking',
      description: 'Interface Temporal HTML/CSS/JS'
    },
    {
      name: 'Dashboard Port 9000',
      url: 'http://localhost:9000/dashboard.html',
      port: 9000,
      status: 'checking',
      description: 'Dashboard réactivé'
    },
    {
      name: 'React Frontend',
      url: 'http://localhost:3000',
      port: 3000,
      status: 'checking',
      description: 'Interface React avancée'
    },
    {
      name: 'Quantum Visualizer',
      url: 'http://localhost:8001',
      port: 8001,
      status: 'checking',
      description: 'Visualiseur quantique'
    }
  ])

  const checkInterfaceStatus = async (interfaceItem: InterfaceStatus): Promise<'active' | 'inactive'> => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)
      
      const response = await fetch(interfaceItem.url, {
        method: 'GET',
        signal: controller.signal,
        mode: 'no-cors'
      })
      
      clearTimeout(timeoutId)
      return 'active'
    } catch (error) {
      return 'inactive'
    }
  }

  const checkAllInterfaces = async () => {
    const updatedInterfaces = await Promise.all(
      interfaces.map(async (interfaceItem) => {
        const status = await checkInterfaceStatus(interfaceItem)
        return { ...interfaceItem, status }
      })
    )
    setInterfaces(updatedInterfaces)
  }

  useEffect(() => {
    checkAllInterfaces()
    const interval = setInterval(checkAllInterfaces, 10000) // Check every 10 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <button 
          className="grut-button" 
          onClick={checkAllInterfaces}
        >
          🔍 Vérifier Statuts
        </button>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {interfaces.map((interfaceItem, index) => (
          <div 
            key={index}
            style={{
              padding: '12px',
              border: `1px solid ${interfaceItem.status === 'active' ? '#00ff88' : '#ff6b35'}`,
              borderRadius: '6px',
              background: 'rgba(26, 26, 46, 0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{interfaceItem.name}</strong>
                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
                  {interfaceItem.description}
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <span className={`grut-status ${interfaceItem.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                  {interfaceItem.status === 'checking' ? '🔄' : interfaceItem.status === 'active' ? '✅' : '❌'}
                  {interfaceItem.status.toUpperCase()}
                </span>
                
                <div style={{ marginTop: '8px' }}>
                  <a 
                    href={interfaceItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="grut-link"
                    style={{ fontSize: '0.9rem' }}
                  >
                    🚀 Ouvrir (:{interfaceItem.port})
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(138, 43, 226, 0.1)', borderRadius: '8px' }}>
        <h4>🎯 Interfaces Spéciales</h4>
        <div style={{ display: 'grid', gap: '8px', marginTop: '10px' }}>
          <a href="/fusion-ultimate-temporal-engine.html" target="_blank" className="grut-link">
            🌀 Fusion Ultimate Temporal Engine
          </a>
          <a href="/omega-zero-trilogie-visuelle.html" target="_blank" className="grut-link">
            ⚔️ OmégaZero Trilogie Visuelle
          </a>
          <a href="/vince-vega-hexagon-battlefield.html" target="_blank" className="grut-link">
            🔶 Vince Vega Hexagon Battlefield
          </a>
          <a href="/portail-100-html-interfaces.html" target="_blank" className="grut-link">
            🌐 Portail 100+ Interfaces HTML
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavigationHub 