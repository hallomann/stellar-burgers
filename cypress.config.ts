import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const pluginFn = require('./cypress/plugins/index');

      pluginFn(on, config);

      return config;
    },
    supportFile: 'cypress/support/index.js',
    specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: "http://localhost:4000"
  }
});
