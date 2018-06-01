const CONFIG_VERSION = 1;

export default function deploy(environment, options) {
  if (options.version !== CONFIG_VERSION) {
    throw new Error(
      `Only compatible with version ${CONFIG_VERSION} configuration files. Got ${
        config.version
      }.`
    );
  }

  if (typeof environment !== 'string' || environment.length === 0) {
    throw new Error('An environment name is required but none was given.');
  }

  console.log({
    [environment]: options.environments[environment]
  });
}
