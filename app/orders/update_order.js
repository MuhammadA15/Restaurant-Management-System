var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");
var orderSchema = mongoose.Schema(conf.get("schema.orders"));


module.exports = function update_order(modify, done) {
  items = [];
  total = 0;
  winston.log("debug", `app: update order: modify: ${modify}`);
  const conn = mongoose.createConnection('mongodb://' + conf.get('database.orders.url') + conf.get('database.orders.name'));
  const orderModel = conn.model('orders', orderSchema);
  orderModel.findByIdAndUpdate(modify._id, modify, function(err, result) {
      if (!err) {
        // handle result
        winston.log("debug", `app: update order: ${result}`);
        done(null);
        conn.close();
      } else {
        // error handling
      }
    })
};
