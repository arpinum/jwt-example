'use strict';

const configuration = require('./configuration');
const jwt = require('jsonwebtoken');

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, configuration.jwtSecret, {algorithm: 'HS256'}, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function sign(decoded) {
  return new Promise((resolve, reject) => {
    jwt.sign(decoded, configuration.jwtSecret, {algorithm: 'HS256'}, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  verify,
  sign
};
