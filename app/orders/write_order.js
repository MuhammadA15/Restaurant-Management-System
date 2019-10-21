var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");
var orderSchema = mongoose.Schema(conf.get("schema.orders"));


module.exports = function write_order(order, done) {
  items = [];
  total = 0;
  console.log(order);
  const conn = mongoose.createConnection('mongodb://' + conf.get('database.orders.url') + conf.get('database.orders.name'));
  const orderModel = conn.model('orders', orderSchema);

  const fconn = mongoose.createConnection('mongodb://' + conf.get('database.food.url') + conf.get('database.food.name'));
  var food_schema = mongoose.Schema(conf.get("schema.food"));
  const food_model = fconn.model('food', food_schema);


  food_model.find({}).exec(function(err, result) {
      if (!err) {
        console.log(result);
        if (Array.isArray(order.quantity)) {
          for (var i = 0; i < order.quantity.length; i++) {
            items.push(order.product[i]);
            items.push(order.quantity[i]);
            total = total + (result.find(test => test.name === order.product[i]).price * order.quantity[i]);
          }
        }
        else {
          items.push(order.product);
          items.push(order.quantity);
          total = total + (result.find(test => test.name === order.product).price * order.quantity);
        }
        totaltax = total + (total * conf.get('tax') * .01);
        var order_create = new orderModel ({
              invoice: {
                total: totaltax.toFixed(2),
                split: 0,
                credit_card: 0,
                cash: 0,
                discount: 0,
                tip: 0,
                tax: (total * conf.get('tax') * .01).toFixed(2),
                items: items
              },
              paid: false,
              table: order.tableid,
              waiter: conf.get(`tables.${order.tableid}`)
            });
            order_create.save(function(err) {
                if (!err){
                    console.log(err);
                    conn.close();
                    done(null);
                  }
                else {
                  done(err);
                }
            });
      } else {
        // error handling
        done(err);
      }
    });
};
