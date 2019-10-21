var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");
// https://www.npmjs.com/package/mongoose

module.exports = function find_max(done) {
  var orderSchema = mongoose.Schema(conf.get("schema.orders"));
  const conn = mongoose.createConnection('mongodb://' + conf.get('database.orders.url') + conf.get('database.orders.name'));
  const orderModel = conn.model('orders', orderSchema);

//this allows the foods to be counted to find the max
  food_max = {
    "Classic Sirloin": 0,
    "Caeser salad": 0,
    "Chicken Fajitas": 0,
    "Bacon Burger": 0,
    "Boneless Wings": 0,
    "Bone-in Wings": 0,
    "Classic Nachos": 0,
    "Fries": 0,
    "Skillet Chocolate Cookie": 0,
    "Cheesecake": 0,
    "Paradise Pie": 0,
    "Molten Chocolate Volcano": 0,
    "Lemonade": 0,
    "Sprite": 0,
    "Dr. Pepper": 0,
    "Water": 0,
    "Mini Pizza": 0,
    "Macaroni Cheese": 0,
    "Grilled Cheese": 0,
    "Beef Sliders": 0
  };

  orderModel.find({}).exec(function(err, result) {
      if (!err) {
        // handle result
        winston.log("silly", "app: manager:", {
          orders: result
        });
        max(result, function (err, max_item) {

          done(null, max_item);
          conn.close();
        });
      } else {
        // error handling
      }
    });


    var j = 0;
    function max(orders, callback) {
      for (var order in orders) {
        // so we can check the max item in the console
        console.log(`order: ${orders[order]}`);
        // finds the max 
        for (var i = 0; i < orders[order].invoice.items.length; i++) {
          food_max[orders[order].invoice.items[i]] = parseFloat(food_max[orders[order].invoice.items[i]]) + parseFloat(orders[order].invoice.items[++i]);
        }
          if (++j == orders.length) {
            // so we can check the max item in the console
            console.log(`foods: ${JSON.stringify(food_max)}`);
            //gives information
            callback(null, Object.keys(food_max).reduce(function(a, b){ return food_max[a] > food_max[b] ? a : b }));
          }
        }
      }
};
