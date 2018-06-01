import fs from 'fs';
import { resolve } from 'path';
import meow from 'meow';
import { fatal } from './log';
import deploy from '.';

const CONFIG_VERSION = 1;

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

const environments = cli.input;
const { config } = cli.flags;
const configFile = resolve(config);

try {
  fs.accessSync(config);
} catch (e) {
  fatal(
    e.code === 'ENOENT' ? `Could not find "${config}". Tried ${configFile}` : e
  );
}

deploy(environments, configFile);
