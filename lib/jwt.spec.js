const jwt = require('jsonwebtoken');
const {verify, sign} = require('./jwt');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiaWF0IjoxNDk2OTI3NTMyfQ.\
G1V_Dd5hm2hYFYpfZqTEu_zVYINolq5siXiWjpQf1I8';

describe('jwt', () => {

  context('during verify', () => {
    it('should resolve token when signature is valid', () => {
      return verify(token).then(decoded => {
        decoded.id.should.equal('42');
      });
    });

    it('should reject when signature is invalid', () => {
      return verify('bleh').then(
        () => Promise.reject('should fail'),
        () => undefined);
    });
  });

  context('during sign', () => {
    it('should resolve token', () => {
      return sign({hello: 'world'}).then(token => {
        let decoded = jwt.decode(token);
        decoded.hello.should.equal('world');
      });
    });
  });
});
