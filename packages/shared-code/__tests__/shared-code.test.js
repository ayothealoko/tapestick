'use strict';

const sharedCode = require('..');
const assert = require('assert').strict;

assert.strictEqual(sharedCode(), 'Hello from sharedCode');
console.info('sharedCode tests passed');
