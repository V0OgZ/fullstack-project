// 🛋️ AUTO-RECONNECT SERVICE POUR JEAN-CANAPÉ
// Reconnexion automatique côté React quand backend crash

export class AutoReconnectService {
    private static instance: AutoReconnectService;
    private reconnectInterval: NodeJS.Timeout | null = null;
    private isReconnecting = false;
    private backendUrl = 'http://localhost:8080';
    private checkInterval = 5000; // 5 secondes
    private maxRetries = 10;
    private currentRetries = 0;

    private constructor() {}

    public static getInstance(): AutoReconnectService {
        if (!AutoReconnectService.instance) {
            AutoReconnectService.instance = new AutoReconnectService();
        }
        return AutoReconnectService.instance;
    }

    // 🔍 Vérifier si backend est up
    private async checkBackendStatus(): Promise<boolean> {
        try {
            const response = await fetch(`${this.backendUrl}/api/status`, {
                method: 'GET',
                timeout: 3000
            } as any);
            return response.ok;
        } catch (error) {
            console.log('🛋️ Backend down, Jean reste sur son canapé...');
            return false;
        }
    }

    // 🚀 Démarrer la surveillance
    public startMonitoring(): void {
        console.log('🛋️ AUTO-RECONNECT: Surveillance démarrée pour Jean-Canapé');
        
        this.reconnectInterval = setInterval(async () => {
            const isBackendUp = await this.checkBackendStatus();
            
            if (!isBackendUp && !this.isReconnecting) {
                this.handleBackendDown();
            } else if (isBackendUp && this.currentRetries > 0) {
                this.handleBackendUp();
            }
        }, this.checkInterval);
    }

    // 📉 Backend down
    private handleBackendDown(): void {
        this.isReconnecting = true;
        this.currentRetries++;
        
        console.log(`🚨 Backend down (tentative ${this.currentRetries}/${this.maxRetries})`);
        console.log('🛋️ Jean reste tranquille, on gère la reconnexion...');
        
        // Afficher notification à l'utilisateur
        this.showReconnectNotification();
        
        if (this.currentRetries >= this.maxRetries) {
            console.log('❌ Max retries atteint - Arrêt surveillance');
            this.stopMonitoring();
            this.showMaxRetriesNotification();
        }
    }

    // 📈 Backend up
    private handleBackendUp(): void {
        console.log('✅ Backend reconnecté ! Jean content sur son canapé');
        this.isReconnecting = false;
        this.currentRetries = 0;
        this.showSuccessNotification();
    }

    // 🛑 Arrêter la surveillance
    public stopMonitoring(): void {
        if (this.reconnectInterval) {
            clearInterval(this.reconnectInterval);
            this.reconnectInterval = null;
        }
        console.log('🛋️ AUTO-RECONNECT: Surveillance arrêtée');
    }

    // 🔔 Notifications visuelles
    private showReconnectNotification(): void {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        notification.innerHTML = `
            🛋️ Backend down<br>
            Jean reste sur son canapé...<br>
            Reconnexion en cours...
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);
    }

    private showSuccessNotification(): void {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4CAF50, #8BC34A);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        notification.innerHTML = `
            ✅ Backend reconnecté !<br>
            🛋️ Jean content sur son canapé !
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    private showMaxRetriesNotification(): void {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #FF5722, #F44336);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        notification.innerHTML = `
            ❌ Backend définitivement down<br>
            🛋️ Jean doit se lever du canapé...<br>
            Relance manuelle nécessaire
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 8000);
    }

    // 🔧 Configuration
    public configure(options: {
        backendUrl?: string;
        checkInterval?: number;
        maxRetries?: number;
    }): void {
        if (options.backendUrl) this.backendUrl = options.backendUrl;
        if (options.checkInterval) this.checkInterval = options.checkInterval;
        if (options.maxRetries) this.maxRetries = options.maxRetries;
    }
}

// 🛋️ Instance globale pour Jean-Canapé
export const autoReconnect = AutoReconnectService.getInstance(); 