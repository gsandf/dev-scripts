import test from 'ava';
import { warn, error } from './log';

test('should have a warn function', t => {
  t.is(typeof warn, 'function');
});

test('should have an error function', t => {
  t.is(typeof error, 'function');
});
