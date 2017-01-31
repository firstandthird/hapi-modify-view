'use strict';
const tapeExtra = require('tape-extras');
const tape = require('tape');
const Hapi = require('hapi');
const vision = require('vision');

const modifyView = require('../');

const loadTest = (options) => tapeExtra(tape, {
  before(done) {
    const server = new Hapi.Server();
    server.connection({ port: 8080 });
    server.register([{
      register: modifyView,
      options
    }, {
      register: vision,
      options: {}
    }], (err) => {
      if (err) {
        throw err;
      }
      server.views({
        engines: { html: require('handlebars') },
        path: `${__dirname}/templates`
      });
      server.start(() => {
        done(null, server);
      });
    });
  },
  after(server, done) {
    server.stop(done);
  }
});

module.exports = loadTest;
