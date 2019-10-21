var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");

// var game = new games_model ({
//
//     });

module.exports = function write_games(game, done) {
  const conn = mongoose.createConnection('mongodb://' + conf.get('database.games.url') + conf.get('database.games.name'));
  var games_schema = mongoose.Schema(conf.get("schema.games"));
  const games_model = conn.model('games', games_schema);
  games_model.findByIdAndUpdate(game._id, game,
    function(err, result) {
      if (!err) {
        // handle result
        winston.log("debug", `app: update games: ${result}`);
        done(null);
        conn.close();
      } else {
        // error handling
      }
    });

};

function write_highscore(games, done) {
  done(null, games);
}
