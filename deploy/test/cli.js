const test = require("ava");
const { execFile } = require("child_process");

const run = args =>
  new Promise(resolve => {
    execFile("node", ["index.js", ...args], (err, stdout, stderr) => {
      resolve({ err, stdout, stderr });
    });
  });

const error = str => `\x1b[31m${str}\x1b[0m`;

test("should do nothing with no arguments", async t => {
  const { stdout } = await run([]);
  t.is(stdout.trim(), "undefined");
});

test("should show error for unknown arguments", async t => {
  const badArg = "-foobar";
  const { stdout } = await run([badArg]);
  t.is(stdout.trim(), error(`Unknown argument ${badArg}`));
});

test("should show help", async t => {
  const short = await run(["-h"]);
  const long = await run(["--help"]);
  const help = short.stdout.split("\n").map(s => s.toLowerCase());
  t.deepEqual(short, long);
  t.true(help.includes("usage"));
  t.true(help.includes("arguments"));
  t.true(help.includes("examples"));
});

test.todo("should accept config file");
test.todo("should show error if config file not found");
test.todo("should show error for incompatible versions");
test.todo("should run deployment based on configuration file");
