const assert = require('assert');
const { logRequest } = require('../../src/logUtils');
const { reqFactory } = require('../factories/logRequest');

describe('logUtils', function() {
  describe('#logRequest()', function() {
    const req = reqFactory();

    it('should extract query', function() {
      assert.equal(logRequest(req).query, req.query);
    });

    it('should extract body', function() {
      assert.equal(logRequest(req).body, req.body);
    });

    it('should extract params', function() {
      assert.equal(logRequest(req).params, req.params);
    });

    it('should extract headers', function() {
      assert.equal(logRequest(req).headers, req.headers);
    });

    it('should extract ip', function() {
      assert.equal(logRequest(req).ip, req.ip);
    });

    it('should extract hostname', function() {
      assert.equal(logRequest(req).hostname, req.hostname);
    });

    it('should extract protocol', function() {
      assert.equal(logRequest(req).protocol, req.protocol);
    });

    it('should extract method', function() {
      assert.equal(logRequest(req).method, req.method);
    });

    it('should extract url', function() {
      assert.equal(logRequest(req).url, req.url);
    });
  });
});
