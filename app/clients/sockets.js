var conf = require('config');
const winston = require('winston');
winston.level = conf.get('app.logging.level');

module.exports = function(clientio)
{
  var clients = [];

  clientio.sockets.on('connect', function(client) {
      clients.push(client);
      winston.log('debug', 'server: client connected');
      client.on('location', function(data)
      {
        client.join(data.path);
      });

      client.on('disconnect', function() {
        client.leave();
        clients.splice(clients.indexOf(client), 1);
      });
  });
};
