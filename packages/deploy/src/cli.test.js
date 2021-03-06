import test from 'ava';
import path from 'path';
import { execFile } from 'child_process';

const cliPath = path.resolve(__dirname, 'cli.js');
const testArguments = [
  '-c',
  path.resolve(__dirname, 'testHelpers/deploy.config.js')
];

const run = args =>
  new Promise(resolve => {
    execFile('babel-node', ['--', cliPath, ...args], (err, stdout, stderr) => {
      resolve({ err, stdout, stderr });
    });
  });

test('should throw when no environment given', async t => {
  const { stderr } = await run(testArguments);
  t.regex(stderr, /environment name is required/i);
});

test('should throw when config file not found', async t => {
  const { stderr } = await run(['-c', './blah.js']);
  t.regex(stderr, /could not find.*?blah\.js/i);
});

test('should show help', async t => {
  const { stdout } = await run(['--help']);
  t.regex(stdout, /usage/i);
  t.regex(stdout, /options/i);
  t.regex(stdout, /examples/i);
});

test('should deploy valid config', async t => {
  const { stderr, stdout } = await run([...testArguments, 'test']);
  console.log(stdout);
  console.error(stderr);
  t.regex(stdout, /isCool/);
});
