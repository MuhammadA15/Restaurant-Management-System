var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");
// https://www.npmjs.com/package/mongoose

// var orderSchema = mongoose.Schema({
//   total: Number,
//   invoice: {
//     split: Number,
//     amount: Number,
//     credit_card: Number,
//     cash: Number,
//     discount: Number,
//     tip: Number
//   },
//   paid: Boolean,
//   table: String,
//   waiter: String
// });


// var order = new food_model ({
//       total: 444,
//       invoice: {
//         split: 1,
//         amount: 444,
//         credit_card: 4444,
//         cash: 0,
//         discount: 0,
//         tip: 12
//       },
//       paid: false,
//       table: "table02",
//       waiter: "waiter01"
//     });


module.exports = function update_food(modify, done) {
  items = [];
  total = 0;
  winston.log("debug", `app: update food: modify: ${modify}`);
  const conn = mongoose.createConnection('mongodb://' + conf.get('database.food.url') + conf.get('database.food.name'));
  var food_schema = mongoose.Schema(conf.get("schema.food"));

  const food_model = conn.model('food', food_schema);
  food_model.findByIdAndUpdate(modify.id, {enabled: modify.enabled}, function(err, result) {
      if (!err) {
        // handle result
        winston.log("debug", `app: update order: ${result}`);
        done(null);
        conn.close();
      } else {
        // error handling
      }
    });
};
