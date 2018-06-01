import path from 'path';
import test from 'ava';
import deploy from './index';

const testArguments = {
  version: 1,
  environments: {
    test: {
      isCool: true
    }
  }
};

test('throws if no environments given', t => {
  t.throws(() => deploy());
  t.throws(() => deploy([]));
});

test('throws when config version is incompatible', t => {
  t.throws(() => deploy('test', { ...testArguments, version: Infinity }));
});
