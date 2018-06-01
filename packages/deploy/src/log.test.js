import test from 'ava';
import { error, info, fatal, success } from './log';

test('should export error logger', t => {
  t.is(typeof error, 'function');
});

test('should export info logger', t => {
  t.is(typeof info, 'function');
});

test('should export fatal logger', t => {
  t.is(typeof fatal, 'function');
});

test('should export success logger', t => {
  t.is(typeof success, 'function');
});
