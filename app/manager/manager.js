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


// var order = new orderModel ({
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


module.exports = function read_orders(orders, done) {
  var orderSchema = mongoose.Schema(conf.get("schema.orders"));
  const conn = mongoose.createConnection('mongodb://' + conf.get('database.orders.url') + conf.get('database.orders.name'));
  const orderModel = conn.model('orders', orderSchema);
  orderModel.find({}).exec(function(err, result) {
      if (!err) {
        // handle result
        winston.log("silly", "app: manager:", {
          orders: result
        });
        orders = result;
        done(null, orders);
        conn.close();
      } else {
        // error handling
      }
    });

  // order.save(function(err) {
  //     if (err){
  //         console.log(err);
  //       }
  //     else {
  //       console.log("success");
  //     }
  // });

};
