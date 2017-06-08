'use strict';

const config = require('@arpinum/config');

const configuration = {
  jwtSecret: {
    env: 'EXA_JWT_SECRET',
    default: 'a robust secret'
  }
};

function load() {
  return Object.assign(config(configuration), {reload: load});
}

module.exports = load();
