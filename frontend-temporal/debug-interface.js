// Debug script for temporal interface
console.log('🕰️ Debugging temporal interface...');

// Test 1: Check if elements exist
function checkElements() {
    console.log('1. Checking DOM elements...');
    
    const loadingScreen = document.getElementById('loadingScreen');
    const mainInterface = document.getElementById('mainInterface');
    const particles = document.getElementById('particles');
    const consoleInput = document.getElementById('consoleInput');
    
    console.log('   - Loading screen:', loadingScreen ? '✅' : '❌');
    console.log('   - Main interface:', mainInterface ? '✅' : '❌');
    console.log('   - Particles container:', particles ? '✅' : '❌');
    console.log('   - Console input:', consoleInput ? '✅' : '❌');
    
    return {
        loadingScreen,
        mainInterface,
        particles,
        consoleInput
    };
}

// Test 2: Check if EnhancedTemporalEngine exists
function checkEngine() {
    console.log('2. Checking EnhancedTemporalEngine...');
    
    if (typeof EnhancedTemporalEngine !== 'undefined') {
        console.log('   - EnhancedTemporalEngine class: ✅');
        
        if (window.engine) {
            console.log('   - Engine instance: ✅');
            console.log('   - Engine connected:', window.engine.isConnected ? '✅' : '❌');
        } else {
            console.log('   - Engine instance: ❌');
        }
    } else {
        console.log('   - EnhancedTemporalEngine class: ❌');
    }
}

// Test 3: Check interface state
function checkInterfaceState() {
    console.log('3. Checking interface state...');
    
    const loadingScreen = document.getElementById('loadingScreen');
    const mainInterface = document.getElementById('mainInterface');
    
    if (loadingScreen && mainInterface) {
        const isLoadingHidden = loadingScreen.classList.contains('hidden');
        const isMainVisible = mainInterface.classList.contains('visible');
        
        console.log('   - Loading screen hidden:', isLoadingHidden ? '✅' : '❌');
        console.log('   - Main interface visible:', isMainVisible ? '✅' : '❌');
        
        if (!isLoadingHidden) {
            console.log('   ⚠️  Interface stuck on loading screen!');
        }
        
        if (!isMainVisible) {
            console.log('   ⚠️  Main interface not visible!');
        }
    }
}

// Test 4: Check backend connection
async function checkBackend() {
    console.log('4. Checking backend connection...');
    
    try {
        const response = await fetch('http://localhost:8080/api/temporal/health');
        
        if (response.ok) {
            const data = await response.json();
            console.log('   - Backend health: ✅');
            console.log('   - Service:', data.service);
            console.log('   - Version:', data.version);
        } else {
            console.log('   - Backend health: ❌', response.status);
        }
    } catch (error) {
        console.log('   - Backend health: ❌', error.message);
    }
}

// Test 5: Check JavaScript errors
function checkErrors() {
    console.log('5. Checking for JavaScript errors...');
    
    // Override console.error to catch errors
    const originalError = console.error;
    const errors = [];
    
    console.error = function(...args) {
        errors.push(args.join(' '));
        originalError.apply(console, args);
    };
    
    setTimeout(() => {
        console.log('   - JavaScript errors:', errors.length > 0 ? '❌' : '✅');
        if (errors.length > 0) {
            errors.forEach(error => console.log('     -', error));
        }
    }, 2000);
}

// Test 6: Force interface initialization
function forceInit() {
    console.log('6. Force interface initialization...');
    
    if (window.engine) {
        console.log('   - Engine already exists, testing hideLoadingScreen...');
        
        const loadingScreen = document.getElementById('loadingScreen');
        const mainInterface = document.getElementById('mainInterface');
        
        if (loadingScreen && mainInterface) {
            console.log('   - Manually hiding loading screen...');
            loadingScreen.classList.add('hidden');
            
            setTimeout(() => {
                console.log('   - Manually showing main interface...');
                mainInterface.classList.add('visible');
            }, 500);
        }
    } else {
        console.log('   - Creating new engine instance...');
        try {
            window.engine = new EnhancedTemporalEngine();
            console.log('   - Engine created successfully ✅');
        } catch (error) {
            console.log('   - Engine creation failed ❌', error.message);
        }
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting temporal interface debug...');
    
    checkElements();
    checkEngine();
    checkInterfaceState();
    await checkBackend();
    checkErrors();
    
    console.log('⚡ Debug complete! Check results above.');
    
    // Offer to force init if needed
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            console.log('🛠️  Interface appears stuck. Running force init...');
            forceInit();
        }
    }, 3000);
}

// Auto-run if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
} 