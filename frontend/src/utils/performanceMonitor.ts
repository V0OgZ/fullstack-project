interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  renderTime: number;
  updateTime: number;
  drawCalls: number;
  visibleObjects: number;
  totalObjects: number;
}

interface PerformanceConfig {
  maxSamples: number;
  updateInterval: number;
  enableMemoryTracking: boolean;
  enableDetailedMetrics: boolean;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    renderTime: 0,
    updateTime: 0,
    drawCalls: 0,
    visibleObjects: 0,
    totalObjects: 0
  };

  private frameTimes: number[] = [];
  private renderTimes: number[] = [];
  private updateTimes: number[] = [];
  private lastFrameTime: number = 0;
  private frameCount: number = 0;
  private lastUpdateTime: number = 0;
  private currentRenderStart: number = 0;
  private currentUpdateStart: number = 0;

  private config: PerformanceConfig = {
    maxSamples: 60,
    updateInterval: 1000,
    enableMemoryTracking: true,
    enableDetailedMetrics: true
  };

  private callbacks: Array<(metrics: PerformanceMetrics) => void> = [];

  constructor(config?: Partial<PerformanceConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
    this.startMonitoring();
  }

  private startMonitoring() {
    this.lastFrameTime = performance.now();
    this.lastUpdateTime = performance.now();
    this.updateMetrics();
  }

  private updateMetrics() {
    const now = performance.now();
    
    // Update FPS calculation
    if (now - this.lastUpdateTime >= this.config.updateInterval) {
      this.calculateFPS();
      this.calculateMemoryUsage();
      this.notifyCallbacks();
      this.lastUpdateTime = now;
    }

    requestAnimationFrame(() => this.updateMetrics());
  }

  private calculateFPS() {
    if (this.frameTimes.length > 0) {
      const avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
      this.metrics.fps = Math.round(1000 / avgFrameTime);
      this.metrics.frameTime = avgFrameTime;
    }

    if (this.renderTimes.length > 0) {
      this.metrics.renderTime = this.renderTimes.reduce((a, b) => a + b, 0) / this.renderTimes.length;
    }

    if (this.updateTimes.length > 0) {
      this.metrics.updateTime = this.updateTimes.reduce((a, b) => a + b, 0) / this.updateTimes.length;
    }
  }

  private calculateMemoryUsage() {
    if (this.config.enableMemoryTracking && 'memory' in performance) {
      const memInfo = (performance as any).memory;
      this.metrics.memoryUsage = memInfo.usedJSHeapSize / (1024 * 1024); // MB
    }
  }

  private notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.metrics));
  }

  // Public methods for tracking
  public startFrame() {
    const now = performance.now();
    if (this.lastFrameTime > 0) {
      const frameTime = now - this.lastFrameTime;
      this.frameTimes.push(frameTime);
      
      if (this.frameTimes.length > this.config.maxSamples) {
        this.frameTimes.shift();
      }
    }
    this.lastFrameTime = now;
    this.frameCount++;
  }

  public startRender() {
    this.currentRenderStart = performance.now();
  }

  public endRender() {
    if (this.currentRenderStart > 0) {
      const renderTime = performance.now() - this.currentRenderStart;
      this.renderTimes.push(renderTime);
      
      if (this.renderTimes.length > this.config.maxSamples) {
        this.renderTimes.shift();
      }
    }
  }

  public startUpdate() {
    this.currentUpdateStart = performance.now();
  }

  public endUpdate() {
    if (this.currentUpdateStart > 0) {
      const updateTime = performance.now() - this.currentUpdateStart;
      this.updateTimes.push(updateTime);
      
      if (this.updateTimes.length > this.config.maxSamples) {
        this.updateTimes.shift();
      }
    }
  }

  public recordDrawCall() {
    this.metrics.drawCalls++;
  }

  public setObjectCounts(visible: number, total: number) {
    this.metrics.visibleObjects = visible;
    this.metrics.totalObjects = total;
  }

  public resetFrameMetrics() {
    this.metrics.drawCalls = 0;
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  public isPerformanceGood(): boolean {
    return this.metrics.fps >= 55 && this.metrics.frameTime <= 20;
  }

  public getPerformanceLevel(): 'excellent' | 'good' | 'fair' | 'poor' {
    if (this.metrics.fps >= 58) return 'excellent';
    if (this.metrics.fps >= 45) return 'good';
    if (this.metrics.fps >= 30) return 'fair';
    return 'poor';
  }

  public getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];
    
    if (this.metrics.fps < 30) {
      suggestions.push('Consider reducing map size or detail level');
    }
    
    if (this.metrics.renderTime > 16) {
      suggestions.push('Rendering is taking too long - enable viewport culling');
    }
    
    if (this.metrics.drawCalls > 1000) {
      suggestions.push('Too many draw calls - consider batching');
    }
    
    if (this.metrics.memoryUsage > 100) {
      suggestions.push('High memory usage - consider object pooling');
    }
    
    if (this.metrics.visibleObjects > 500) {
      suggestions.push('Too many visible objects - increase culling distance');
    }
    
    return suggestions;
  }

  public exportMetrics(): string {
    const data = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      samples: {
        frameTimes: this.frameTimes.slice(-10),
        renderTimes: this.renderTimes.slice(-10),
        updateTimes: this.updateTimes.slice(-10)
      }
    };
    
    return JSON.stringify(data, null, 2);
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const getPerformanceMonitor = (config?: Partial<PerformanceConfig>): PerformanceMonitor => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor(config);
  }
  return performanceMonitor;
};

export const createPerformanceHook = () => {
  const monitor = getPerformanceMonitor();
  
  return {
    startFrame: () => monitor.startFrame(),
    startRender: () => monitor.startRender(),
    endRender: () => monitor.endRender(),
    startUpdate: () => monitor.startUpdate(),
    endUpdate: () => monitor.endUpdate(),
    recordDrawCall: () => monitor.recordDrawCall(),
    setObjectCounts: (visible: number, total: number) => monitor.setObjectCounts(visible, total),
    resetFrameMetrics: () => monitor.resetFrameMetrics(),
    getMetrics: () => monitor.getMetrics(),
    subscribe: (callback: (metrics: PerformanceMetrics) => void) => monitor.subscribe(callback),
    isPerformanceGood: () => monitor.isPerformanceGood(),
    getPerformanceLevel: () => monitor.getPerformanceLevel(),
    getOptimizationSuggestions: () => monitor.getOptimizationSuggestions(),
    exportMetrics: () => monitor.exportMetrics()
  };
};

export type { PerformanceMetrics, PerformanceConfig };
export { PerformanceMonitor }; 