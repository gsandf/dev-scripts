import test from 'ava';
import path from 'path';
import { execFile } from 'child_process';

const cliPath = path.resolve(__dirname, 'index.js');
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

const error = str => `\x1b[31m${str}\x1b[0m`;

test('should show error when no environment given', async t => {
  const { stdout } = await run([...testArguments]);
  t.true(/environment name is required/i.test(stdout));
});

test('should show error for unknown arguments', async t => {
  const { stdout } = await run(['-foobar']);
  t.true(/unknown argument -foobar/i.test(stdout));
});

test('should show help', async t => {
  const short = await run(['-h']);
  const long = await run(['--help']);
  const withConfig = await run([...testArguments, '-h']);
  t.deepEqual(short, long);
  t.deepEqual(long, withConfig);

  const help = short.stdout.split('\n').map(s => s.toLowerCase());
  t.true(help.includes('usage'));
  t.true(help.includes('arguments'));
  t.true(help.includes('examples'));
});

test.todo('should accept config file');
test.todo('should show error if config file not found');
test.todo('should show error for incompatible versions');
test.todo('should run deployment based on configuration file');
