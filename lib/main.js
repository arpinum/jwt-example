'use strict';

const express = require('express');
const {verify} = require('./jwt');

const app = express();

app.use(setCurrentUser);
app.all('/me', ensureUserExists);
app.get('/me', mySelfGet);
app.use(handleError);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

function setCurrentUser(request, response, next) {
  let token = request.headers['x-auth-token'];
  verify(token)
    .then(decoded => {
      request.userId = decoded.id;
      next();
    })
    .catch(() => next(new Error('forbidden')));
}

function ensureUserExists(request, response, next) {
  if (!request.userId) {
    next(new Error('forbidden'));
  }
  next();
}

function mySelfGet(request, response) {
  response.send({id: request.userId});
}

function handleError(error, request, response, next) {
  void next;
  let map = {
    'not found': 404,
    'forbidden': 401
  };
  let status = map[error.message] || 400;
  response.status(status).send({error});
}
