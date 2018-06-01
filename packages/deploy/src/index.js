import { fatal } from './log';

const dynamicRequire =
  typeof __non_webpack_require__ !== 'undefined'
    ? __non_webpack_require__
    : require;

export default function deploy(environments, configFile) {
  if (environments.length === 0) {
    fatal('An environment name is required but none was given.');
  }

  const config = dynamicRequire(configFile);

  console.log(
    environments.map(environment => ({
      [environment]: config.environments[environment]
    }))
  );
}
