'use strict';
const str2fn = require('str2fn');
exports.register = (server, options, allDone) => {
  server.ext('onPostHandler', (request, reply) => {
    const source = request.response.source;
    request.render(source.template, source.context, source.options, (err, html) => {
      if (err) {
        return server.log(err);
      }
      return reply(str2fn(server.methods, options.method)(html));
    });
  });
  allDone();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
