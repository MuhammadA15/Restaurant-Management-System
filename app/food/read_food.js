var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");



module.exports = function read_food(food, done) {
  const conn = mongoose.createConnection('mongodb://' + conf.get('database.food.url') + conf.get('database.food.name'));
  var food_schema = mongoose.Schema(conf.get("schema.food"));
  const food_model = conn.model('food', food_schema);
  food_model.find({}).exec(function(err, result) {
      if (!err) {
        // handle result
        winston.log("silly", "app: food:", {
          foods: result 
        });
        food = result;
        done(null, food);
        conn.close();
      } else {
        // error handling
      }
    });
};
