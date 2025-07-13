import React, { useState, useEffect, useCallback } from 'react';
import { getPerformanceMonitor, PerformanceMetrics } from '../utils/performanceMonitor';
import './PerformanceDashboard.css';

interface PerformanceDashboardProps {
  isVisible: boolean;
  onClose?: () => void;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ isVisible, onClose }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    renderTime: 0,
    updateTime: 0,
    drawCalls: 0,
    visibleObjects: 0,
    totalObjects: 0
  });

  const [history, setHistory] = useState<PerformanceMetrics[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [performanceLevel, setPerformanceLevel] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');

  const monitor = getPerformanceMonitor();

  // Update metrics
  useEffect(() => {
    if (!isVisible) return;

    const unsubscribe = monitor.subscribe((newMetrics) => {
      setMetrics(newMetrics);
      
      // Update history (keep last 60 samples)
      setHistory(prev => {
        const newHistory = [...prev, newMetrics];
        return newHistory.slice(-60);
      });

      // Update suggestions and performance level
      setSuggestions(monitor.getOptimizationSuggestions());
      setPerformanceLevel(monitor.getPerformanceLevel());
    });

    return unsubscribe;
  }, [isVisible, monitor]);

  const getPerformanceColor = (level: string): string => {
    switch (level) {
      case 'excellent': return '#4CAF50';
      case 'good': return '#8BC34A';
      case 'fair': return '#FFC107';
      case 'poor': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const exportMetrics = useCallback(() => {
    const data = monitor.exportMetrics();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-metrics-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [monitor]);

  const formatMemory = (mb: number): string => {
    return `${mb.toFixed(1)} MB`;
  };

  const formatTime = (ms: number): string => {
    return `${ms.toFixed(2)} ms`;
  };

  if (!isVisible) return null;

  return (
    <div className="performance-dashboard">
      <div className="dashboard-header">
        <h2>🚀 Performance Dashboard</h2>
        <div className="header-controls">
          <button onClick={exportMetrics} className="export-btn">
            📊 Export
          </button>
          {onClose && (
            <button onClick={onClose} className="close-btn">
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="dashboard-content">
        {/* Performance Overview */}
        <div className="metrics-section">
          <h3>📈 Performance Overview</h3>
          <div className="performance-level">
            <span className="level-label">Overall Performance:</span>
            <span 
              className="level-value"
              style={{ color: getPerformanceColor(performanceLevel) }}
            >
              {performanceLevel.toUpperCase()}
            </span>
          </div>
          
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-label">FPS</div>
              <div 
                className="metric-value"
                style={{ color: metrics.fps >= 55 ? '#4CAF50' : metrics.fps >= 30 ? '#FFC107' : '#F44336' }}
              >
                {metrics.fps}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Frame Time</div>
              <div className="metric-value">
                {formatTime(metrics.frameTime)}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Memory Usage</div>
              <div className="metric-value">
                {formatMemory(metrics.memoryUsage)}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Render Time</div>
              <div className="metric-value">
                {formatTime(metrics.renderTime)}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Update Time</div>
              <div className="metric-value">
                {formatTime(metrics.updateTime)}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Draw Calls</div>
              <div className="metric-value">
                {metrics.drawCalls}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Visible Objects</div>
              <div className="metric-value">
                {metrics.visibleObjects}/{metrics.totalObjects}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Culling Ratio</div>
              <div className="metric-value">
                {metrics.totalObjects > 0 ? 
                  `${(((metrics.totalObjects - metrics.visibleObjects) / metrics.totalObjects) * 100).toFixed(1)}%` : 
                  '0%'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Performance Graph */}
        <div className="graph-section">
          <h3>📊 FPS History</h3>
          <div className="performance-graph">
            <svg width="100%" height="120" viewBox="0 0 400 120">
              <defs>
                <linearGradient id="fpsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.2"/>
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              <g stroke="#333" strokeWidth="1" opacity="0.3">
                <line x1="0" y1="20" x2="400" y2="20" />
                <line x1="0" y1="40" x2="400" y2="40" />
                <line x1="0" y1="60" x2="400" y2="60" />
                <line x1="0" y1="80" x2="400" y2="80" />
                <line x1="0" y1="100" x2="400" y2="100" />
              </g>

              {/* FPS line */}
              {history.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#4CAF50"
                  strokeWidth="2"
                  points={history.map((h, i) => {
                    const x = (i / (history.length - 1)) * 400;
                    const y = 120 - (h.fps / 60) * 100;
                    return `${x},${y}`;
                  }).join(' ')}
                />
              )}

              {/* Target FPS line (60 FPS) */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#FFD700" strokeWidth="1" strokeDasharray="5,5" />
              
              {/* Labels */}
              <text x="5" y="15" fill="#FFD700" fontSize="10">60 FPS</text>
              <text x="5" y="35" fill="#666" fontSize="10">45 FPS</text>
              <text x="5" y="55" fill="#666" fontSize="10">30 FPS</text>
              <text x="5" y="75" fill="#666" fontSize="10">15 FPS</text>
              <text x="5" y="95" fill="#666" fontSize="10">0 FPS</text>
            </svg>
          </div>
        </div>

        {/* Optimization Suggestions */}
        {suggestions.length > 0 && (
          <div className="suggestions-section">
            <h3>💡 Optimization Suggestions</h3>
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <span className="suggestion-icon">⚠️</span>
                  <span className="suggestion-text">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Tips */}
        <div className="tips-section">
          <h3>🎯 Performance Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-title">🖥️ Rendering</div>
              <div className="tip-content">
                • Enable viewport culling<br/>
                • Use object pooling<br/>
                • Batch similar objects
              </div>
            </div>

            <div className="tip-card">
              <div className="tip-title">🧠 Memory</div>
              <div className="tip-content">
                • Reuse objects<br/>
                • Clear unused references<br/>
                • Use WeakMap for caching
              </div>
            </div>

            <div className="tip-card">
              <div className="tip-title">⚡ Updates</div>
              <div className="tip-content">
                • Throttle expensive operations<br/>
                • Use requestAnimationFrame<br/>
                • Avoid layout thrashing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard; 