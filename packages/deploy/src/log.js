import figures from 'figures';
import { Signale } from 'signale';
import defaultTypes from 'signale/types';

const options = {
  stream: process.stderr,
  types: {
    error: {
      badge: figures.cross,
      color: 'red',
      label: 'error'
    }
  }
};

/**
 * Logs error messages to stderr
 * @param  {String|Object|Error|Array} msg - Message to log. See https://github.com/klauscfhq/signale#api
 */
const { error } = new Signale(options);

/**
 * Logs fatal messages and forces app to stop
 * @param  {String|Object|Error|Array} msg - Message to log. See https://github.com/klauscfhq/signale#api
 */
const fatal = (...msg) => {
  error(...msg);
  process.exit(1);
};

// Re-export loggers from Signale
export * from 'signale';

// Extend with loggers that should write to stderr
export { error, fatal };
