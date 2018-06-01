import fs from 'fs';
import { resolve } from 'path';
import meow from 'meow';
import { fatal } from './log';
import dynamicRequire from './dynamicRequire';
import deploy from '.';

const cli = meow(
  `
  Usage
    $ deploy <environment>

  Options
    environment   The name of the environment to deploy

  Examples
    Deploy an environment named "production"
    $ deploy production
`,
  {
    flags: {
      config: {
        alias: '-c',
        default: './deploy.config.js',
        type: 'string'
      }
    }
  }
);

const environment = cli.input.join(' ');
const { config } = cli.flags;
const configFile = resolve(config);

// Test if given configuration file exists.
try {
  fs.accessSync(config);
} catch (e) {
  fatal(
    e.code === 'ENOENT' ? `Could not find "${config}". Tried ${configFile}` : e
  );
}

const options = dynamicRequire(configFile);

// It's an error if no environment is listed
if (environment.length === 0) {
  fatal('An environment name is required but none was given.');
}

// Deploy given environment
deploy(environment, options);
