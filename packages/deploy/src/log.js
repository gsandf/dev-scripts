import figures from 'figures';
import { Signale } from 'signale';
import defaultTypes from 'signale/types';

const options = {
  stream: process.stderr,
  types: {
    fatal: {
      badge: figures.cross,
      color: 'red',
      label: 'error'
    }
  }
};

const fatalLogger = new Signale(options).fatal;

/**
 * Logs fatal messages and forces app to stop
 * @param  {String|Object|Error|Array} msg - Message to log. See https://github.com/klauscfhq/signale#api
 */
const fatal = (...msg) => {
  fatalLogger(...msg);
  process.exit(1);
};

// Re-export loggers from Signale
export * from 'signale';

// Extend with loggers that should write to stderr
export { fatal };
