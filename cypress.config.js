import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Update this to match your development server URL
    setupNodeEvents(on, config) { },
    supportFile: false,
  },
});
