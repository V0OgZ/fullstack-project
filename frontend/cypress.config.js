const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,  // Disable video recording
    screenshotOnRunFailure: false,  // Disable screenshots
    defaultCommandTimeout: 15000,  // Slower timeouts for better visibility
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 30000,
    // Slow down tests for real-time viewing
    execTimeout: 60000,
    taskTimeout: 60000,
    env: {
      backendUrl: 'http://localhost:8080',
      wsUrl: 'ws://localhost:8080/ws'
    },
    setupNodeEvents(on, config) {
      // Implement custom node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    },
  },
  
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
}); 