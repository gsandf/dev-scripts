#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { error } = require('./log');

const CONFIG_VERSION = 1;

function showUsage() {
  console.log(
    `Usage
      $ deploy <environment>
    Arguments
      environment   The name of the environment to deploy
    Examples
      Deploy an environment named "production"
      $ deploy production
  `.replace(/^ {4}/gm, '')
  );
}

function runDeployment(config, environment) {
  console.log(config.environments[environment]);
}

function main() {
  const argv = process.argv.slice(2);
  let configFile = path.resolve('./deploy.config.js');
  let environments = [];

  // Process all arguments sent to CLI
  while (argv.length) {
    const arg = argv.shift();

    switch (arg) {
      case '-c':
      case '--config':
        const configFilename = argv.shift();
        configFile = path.resolve(configFilename);
        try {
          fs.accessSync(configFile);
        } catch (e) {
          error(`Could not find "${configFilename}". Tried ${configFile}`);
          process.exit(1);
        }
        break;

      case '-h':
      case '--help':
        showUsage();
        process.exit();
        break;

      default:
        // Other arguments must be environment names
        if (/^-/.test(arg)) {
          error(`Unknown argument ${arg}`);
          process.exit(1);
        }
        environments.push(arg);
    }
  }

  const config = require(configFile);

  // Error if configuration version isn't compatible with CLI
  if (config.version !== CONFIG_VERSION) {
    error(
      `Only compatible with version ${CONFIG_VERSION} configuration files. Got ${
        config.version
      }.`
    );
    process.exit(1);
  }

  runDeployment(config, environments);
}

main();
