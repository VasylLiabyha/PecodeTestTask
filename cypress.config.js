const { defineConfig } = require("cypress", "cypress-xpath", "./commands");



module.exports = defineConfig({
  reporter: 'junit',
  video: false,
  reporterOptions: {
    testsuitesTitle: 'my tests',
    mochaFile: 'cypress/results/testResults[hash].xml',
    toConsole: true
  
  },
  e2e:{
    setupNodeEvents(on, config) {
    },
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 4000,
    baseUrl: 'https://rozetka.com.ua/ua/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
    },
  },
});
