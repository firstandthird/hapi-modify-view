'use strict';

exports.register = (server, options, allDone) => {
  server.ext('onPostHandler', (request, reply) => {
    const modifyHtml = (typeof options.method === 'string') ? server.methods[options.method] : options.method;
    const source = request.response.source;
    request.render(source.template, source.context, source.options, (err, html) => {
      if (err) {
        return server.log(err);
      }
      return reply(modifyHtml(html));
    });
  });
  allDone();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
