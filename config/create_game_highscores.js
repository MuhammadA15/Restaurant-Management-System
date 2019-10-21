var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");

const conn = mongoose.createConnection('mongodb://' + conf.get('database.games.url') + conf.get('database.games.name'));
var games_schema = mongoose.Schema(conf.get("schema.games"));
const games_model = conn.model('games', games_schema);


var games = new games_model ({
  game01: {
    highscore01: {
      name: "test",
      score: 3 },
    highscore02: {
      name: "test2",
      score: 2 },
    highscore03: {
      name: "test3",
      score: 1 }
    },
    game02: {
      highscore01: {
        name: "test",
        score: 3 },
      highscore02: {
        name: "test2",
        score: 2 },
      highscore03: {
        name: "test3",
        score: 1 }
      }
    });

games.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      conn.close();
      console.log("success");
    }
});
