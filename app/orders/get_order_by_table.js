// https://www.npmjs.com/package/mongoose
var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");

module.exports = function get_order_by_table(order, tableid, done) {
  var orderSchema = mongoose.Schema(conf.get("schema.orders"));
  const conn = mongoose.createConnection('mongodb://' + conf.get('database.orders.url') + conf.get('database.orders.name'));
  const orderModel = conn.model('orders', orderSchema);
  orderModel.find({
    table: tableid,
    paid: false
    }).exec(function(err, result) {
      if (!err) {
        // handle result
        winston.log("silly", "app: orders get_order_by_table:", {
          order: result
        });
        order = result;
        done(null, order);
        conn.close();
      } else {
        // error handling
      }
    });

};
