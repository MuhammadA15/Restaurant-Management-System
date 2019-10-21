var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");



module.exports = function read_games(games, done) {
  const conn = mongoose.createConnection('mongodb://' + conf.get('database.games.url') + conf.get('database.games.name'));
  var games_schema = mongoose.Schema(conf.get("schema.games"));
  const games_model = conn.model('games', games_schema);
  games_model.find({}).exec(function(err, result) {
      if (!err) {
        // handle result
        winston.log("silly", "app: games:", {
          gamess: result
        });
        games = result;
        done(null, games)
        conn.close();
      } else {
        // error handling
      };
    });
}
