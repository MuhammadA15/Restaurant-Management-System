var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");
// https://www.npmjs.com/package/mongoose

module.exports = function salesAnalysis(done) {
    var orderSchema = mongoose.Schema(conf.get("schema.orders"));
    const conn = mongoose.createConnection('mongodb://' + conf.get('database.orders.url') + conf.get('database.orders.name'));
    const orderModel = conn.model('orders', orderSchema);

  sales_analysis_info = {
    "totalSales": 0,
    "totalTax": 0,
    "waiter1Tips": 0,
    "waiter2Tips": 0,
    "waiter3Tips": 0
  };

   orderModel.find({}).exec(function(err, result) {
      if (!err) {
        // handle result
        winston.log("silly", "app: manager:", {
          orders: result
        });
        tSales(result, function (err, sales_analysis_info) {
          console.log(`sales_analysis_info: ${sales_analysis_info}`);
          done(null, sales_analysis_info);
          conn.close();
        });
      } else {
        // error handling
      }
    });

    function tSales(orders, callback) {
      var j = 0;
      for (var order in orders) {
        console.log(`order: ${orders[order]}`);
           sales_analysis_info.totalSales = parseFloat(sales_analysis_info["totalSales"]) + parseFloat(orders[order].invoice.total);
           sales_analysis_info.totalTax =  parseFloat(sales_analysis_info["totalTax"]) + parseFloat(orders[order].invoice.tax);
            if(orders[order].waiter == "waiter01"){
                    sales_analysis_info["waiter1Tips"] = parseFloat(sales_analysis_info["waiter1Tips"]) + parseFloat(orders[order].invoice.tip);
            }else if(orders[order].waiter == "waiter02"){
                sales_analysis_info["waiter2Tips"] = parseFloat(sales_analysis_info["waiter2Tips"]) + parseFloat(orders[order].invoice.tip);
            }else if(orders[order].waiter == "waiter03"){
                sales_analysis_info["waiter3Tips"] = parseFloat(sales_analysis_info["waiter3Tips"]) + parseFloat(orders[order].invoice.tip);
            }
          if (++j == orders.length) {
            callback(null, sales_analysis_info);
          }
        }
      }
};
