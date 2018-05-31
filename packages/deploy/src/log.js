const reset = '\x1b[0m';

const underline = '\x1b[4m';
const red = '\x1b[31m';
const black = '\x1b[30m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';
const magenta = '\x1b[35m';
const cyan = '\x1b[36m';
const white = '\x1b[37m';

const print = (format, str) => {
  console.log(`${format.join('')}%s${reset}`, str);
};

export const warn = s => print([yellow], s);
export const error = s => print([red], s);
