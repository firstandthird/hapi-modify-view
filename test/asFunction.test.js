'use strict';
const makeTest = require('./loadTests.js');

const test = makeTest({
  method: (html) => `${html} etc.`
});
test('thing', (t, server) => {
  server.route({
    path: '/',
    method: 'GET',
    handler: (req, res) => {
      res.view('test', {});
    }
  });
  server.inject({
    url: '/',
    method: 'GET'
  }, (res) => {
    t.equal(res.result.indexOf('a test you can render') > -1, true);
    t.equal(res.result.indexOf('etc') > -1, true);
    t.end();
  });
});
