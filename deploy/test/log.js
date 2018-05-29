const test = require("ava");
const log = require("../log");

test("should have a warn function", t => {
  t.is(typeof log.warn, "function");
});

test("should have an error function", t => {
  t.is(typeof log.error, "function");
});
