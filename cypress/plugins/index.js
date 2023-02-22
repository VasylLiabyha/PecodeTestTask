//index.js inside plugin folder
const { initPlugin } = require('cypress-plugin-snapshots/plugin');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const exec = require('child_process').execSync;
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse')

module.exports = (on) => {
  on('before:run', async (details) => {
    console.log('override before:run');
    await beforeRunHook(details);
    //If you are using other than Windows remove below two lines
    await exec("IF EXIST cypress\\screenshots rmdir /Q /S cypress\\screenshots")
    await exec("IF EXIST cypress\\reports rmdir /Q /S cypress\\reports")
  });
on('after:run', async () => {
    console.log('override after:run');
    //if you are using other than Windows remove below line (having await exec)
    await exec("npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml");
    await afterRunHook();
  });
  
};

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions)
  })

  on('task', {
    lighthouse: lighthouse(), // calling the function is important
  })
}