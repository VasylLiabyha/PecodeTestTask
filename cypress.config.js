const { defineConfig } = require("cypress", "cypress-xpath", "./commands", "cypress-real-events",'setUserData');
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin');
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");


module.exports = defineConfig({
  reporter: 'junit',
  video: false,
  reporterOptions: {
    testsuitesTitle: 'Dashboard tests',
    mochaFile: 'results/testResults[hash].xml',
    toConsole: true
  
  },
  e2e:{
    setupNodeEvents(on, config) {
    },
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 4000,
    baseUrl: 'https://loans.development.jgwentworth.com/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      on('task', {
        setUserData: (userData) => {
          global.userData = userData;
          return null;
        },
        getUserData: () => {
          return global.userData;
        },
      });
      getCompareSnapshotsPlugin(on, config);   
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
  
      on("task", {
        lighthouse: lighthouse(), // calling the function is important
        pa11y: pa11y(), // calling the function is important
      });
    },
  },
  "env": {
    "cypress-plugin-snapshots": {
      "autoCleanUp": false,            // Automatically remove snapshots that are not used by test
      "autopassNewSnapshots": true,    // Automatically save & pass new/non-existing snapshots
      "diffLines": 3,                  // How many lines to include in the diff modal
      "excludeFields": [],             // Array of fieldnames that should be excluded from snapshot
      "ignoreExtraArrayItems": false,  // Ignore if there are extra array items in result
      "ignoreExtraFields": false,      // Ignore extra fields that are not in `snapshot`
      "normalizeJson": true,           // Alphabetically sort keys in JSON
      "prettier": true,                // Enable `prettier` for formatting HTML before comparison
      "imageConfig": {
        "createDiffImage": true,       // Should a "diff image" be created, can be disabled for performance
        "resizeDevicePixelRatio": true,// Resize image to base resolution when Cypress is running on high DPI screen, `cypress run` always runs on base resolution
        "threshold": 0.01,             // Amount in pixels or percentage before snapshot image is invalid
        "thresholdType": "percent"     // Can be either "pixels" or "percent"
      },
      "screenshotConfig": {            // See https://docs.cypress.io/api/commands/screenshot.html#Arguments
        "blackout": [],
        "capture": "fullPage",
        "clip": null,
        "disableTimersAndAnimations": true,
        "log": false,
        "scale": false,
        "timeout": 30000
      },
      "serverEnabled": true,           // Enable "update snapshot" server and button in diff modal
      "serverHost": "localhost",       // Hostname for "update snapshot server"
      "serverPort": 2121,              // Port number for  "update snapshot server"
      "updateSnapshots": false,        // Automatically update snapshots, useful if you have lots of changes
      "backgroundBlend": "difference"  // background-blend-mode for diff image, useful to switch to "overlay"
    }
  },
});
