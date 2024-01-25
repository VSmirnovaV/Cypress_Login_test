const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "b6v7nx",
  e2e: {
    baseUrl:'https://qamid.tmweb.ru/client/index.php',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
