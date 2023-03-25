const path = require("path");
const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3300;
const startFile = require("../bin/start");

const basePath = path.join(__dirname, "../dist/statics");

app.use(cors());
app.use(express.static(basePath));

app.listen(port, () => {
  console.log(chalk.green("Compiled successfully!\n"));
  console.log(
    `Your bundles and other static assets are served from your ${chalk.bold(
      "dev-server."
    )}\n`
  );
  console.log(`\t${chalk.bold("Local:")}\thttp://localhost:${port}/`);
});
