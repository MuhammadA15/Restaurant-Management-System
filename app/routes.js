var read_orders = require("./manager/manager");
var disable_food_by_id = require("./manager/disable");
var read_food = require("./food/read_food");
var find_max = require("./food/find_max");

var write_order = require("./orders/write_order");
var update_order = require("./orders/update_order");

var write_games = require("./Games/write_games");
var read_games = require("./Games/read_games");

var get_order_by_table = require("./orders/get_order_by_table");

var sales_analysis = require("./manager/salesanalysis");


// var buildJenkinsJob = require("./jenkins/build");
// var spawn = require("child_process").spawn;
// var csrf = require("csurf");
// var csrfProtection = csrf({ cookie: true });
var clients = [];
var conf = require("config");
const winston = require("winston");
winston.level = conf.get("app.logging.level");

module.exports = function(app, passport, clientio) {
	// =====================================
	// HOME PAGE  ========
	// =====================================
	app.get("/", function(req, res) {
			res.render(
				"default.ejs",
				{
					title: "A Project By WACCTM",
					user: null,
					message: req.session.message
				},
				(req.session.message = null)
			);
		});

		// =====================================
		// table PAGE  ========
		// This is where the customers interact with the interface
		// to use must login as tableid table[0-1][0-9]
		// =====================================
  app.get("/table", is_logged_in, function(req, res) {
    food = {};
    games = {};
		order = {};
    read_games(games, function (err, games) {
      read_food(food, function (err, food) {
				find_max(function (err, max) {
					get_order_by_table(order, req.user.local.username, function (err, order) {
						res.render(
							"table.ejs",
							{
								title: "Restaurant Menu",
								user: req.user,
								food: food,
								order: order,
								highscores: games,
								max: max,
								message: req.session.message
							},
							(req.session.message = null)
						);
					});
				});
      });
    });
		});

    app.get("/games", function(req, res) {
      games = {};
      read_games(games, function (err, games) {
        res.render(
          "game01.ejs",
          {
            title: "Breakout",
            user: req.user,
            highscores: games,
            message: req.session.message
          },
          (req.session.message = null)
        );
      });
      });

      app.get("/games2", function(req, res) {
      games = {};
      read_games(games, function (err, games) {
        res.render(
          "game02.ejs",
          {
            title: "Space Invaders",
            user: req.user,
            highscores: games,
            message: req.session.message
          },
          (req.session.message = null)
        );
      });
      });

      app.get("/games3", function(req, res) {
      games = {};
        res.render(
          "game03.ejs",
          {
            title: "2048",
            user: req.user,
            message: req.session.message
          },
          (req.session.message = null)
        );
      });


      app.post("/games",
      function(req, res) {
        write_games(req.body, function(err){
          if (!err) {
            res.redirect("back");
            winston.log("info", "modified games");
          }
        });
      });



	// =====================================
	// Kitchen page ========
	// =====================================
	app.get("/kitchen", is_logged_in, is_authorized, function(req, res) {
			res.render(
				"default.ejs",
				{
					title: "Kitchen",
					user: req.user,
					message: req.session.message
				},
				(req.session.message = null)
			);
		});


	// =====================================
	// Waiter page ========
	// =====================================
	app.get("/waiter", is_logged_in, is_authorized, function(req, res) {
		orders1 = {}
		read_orders(orders1, function (err, orders1) {
			res.render(
				"default.ejs",
				{
					title: "Waiter",
					user: req.user,
					orders: orders1,
					message: req.session.message
				},
				(req.session.message = null)
			);
		});
		});


		// =====================================
		// Manager page ========================
		// =====================================
		app.get("/manager", is_logged_in, is_authorized, function(req, res) {
      orders = {};
      food = {};

      read_food(food, function (err, food) {
        read_orders(orders, function (err, orders) {
          sales_analysis(function (err, salesAnalysis) {
            res.render(
          		"default.ejs",
          		{
          			title: "Manager Menu",
          			user: req.user,
                orders: orders,
                food: food,
                totalSales: salesAnalysis.totalSales,
                totalTax: salesAnalysis.totalTax,
                waiter1Tips: salesAnalysis.waiter1Tips,
                waiter2Tips: salesAnalysis.waiter2Tips,
                waiter3Tips: salesAnalysis.waiter3Tips,
          			message: req.session.message
          		},
          		(req.session.message = null)
          	);
          });
        });
      });

		});

			app.post(
	      "/disable",
	      is_logged_in,
	      function(req, res) {
	        clientio.to("manager").emit('enable', req.body);
	        disable_food_by_id(req.body, function(err){
	          if (!err) {
	            res.redirect("/manager");
	            winston.log("info", "Successfully Disabled");
	          }
	        });

	      });

    // =====================================
    // Order Form =======================
    // =====================================
    app.post(
      "/order",
      is_logged_in,
      function(req, res) {
        clientio.to("kitchen").emit('order', req.body);
        clientio.to("waiter").emit('order1', req.body);
        write_order(req.body, function(err){
          if (!err) {
            res.redirect("/table");
            winston.log("info", "success writing");
          }
        });
      });

    // =====================================
    // Pay Form =======================
    // =====================================
    app.post(
      "/pay-damage",
      is_logged_in,
      function(req, res) {
        update_order(req.body, function(err){
          if (!err) {
            clientio.to("waiter").emit('paid', req.body.tableid);
            res.redirect("/table");
            winston.log("info", "success writing");
          }
        });

      });

		// =====================================
		// Notify Waiters Order is Ready Form ==
		// =====================================
		app.post(
			"/ready",
			is_logged_in,
			function(req, res) {
        res.redirect("/kitchen");
				clientio.to("waiter").emit('ready', req.body);
			});

			// =====================================
			// Notify Waiters Order is in Progress =
			// =====================================
			app.post(
				"/progress",
				is_logged_in,
				function(req, res) {
          res.redirect("/kitchen");
					clientio.to("waiter").emit('progress', req.body);
				});


    // =====================================
    // Notify Managers for compensation ====
    // =====================================
    app.post(
    	"/compensate",
    	is_logged_in,
    	function(req, res) {
        clientio.to("manager").emit('compensate', req.body);
        res.redirect("/waiter");
    	});

      // =====================================
      // Assistance Form =====================
      // =====================================
      app.post(
        "/assistance",
        is_logged_in,
        function(req, res) {
					if (req.body.type.includes("refill")) {
						clientio.to("waiter").emit('refill', req.body.tableid);
					}
					else if (req.body.type.includes("assistance")) {
						clientio.to("waiter").emit('assistance', req.body.tableid);
					}
            res.redirect("/table");
        });


			// =====================================
			// Login page ========
			// =====================================
	    app.get('/login', function(req, res) {
					res.render(
						"default.ejs",
						{
							title: "Login",
							user: null,
							message: req.session.message
						},
						(req.session.message = null)
					);
				});

    // =====================================
    // Login page ========
    // =====================================
    app.get('/signup', function(req, res) {
        res.render(
          "default.ejs",
          {
            title: "Signup",
            user: null,
            message: req.session.message
          },
          (req.session.message = null)
        );
      });


		// =====================================
		// Login authentication strat ========
		// =====================================
    app.post('/login', passport.authenticate('local-login', {
			// check if the credentials are correct
        successRedirect : false,
        failureRedirect : "/login",
        failureFlash : true
				// if the credentials are correct redirect to the correct interface
    }), function(req, res) {
        res.redirect("/" + req.user.local.group);
		});
		// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/manager',
        failureRedirect : '/manager',
        failureFlash : true
    }));
		// =====================================
		// LOGOUT ==============================
		// =====================================
		app.get("/logout", function(req, res) {
			req.logout();
			res.redirect("/");
		});



	// =====================================
	// CSRF Check ==========================
	// =====================================
	// app.use(function(error, req, res, next) {
	// 	if (error.code !== "EBADCSRFTOKEN") return next(error);
	// 	// handle CSRF token errors here
	// 	res.status(403);
	// 	req.session.message =
	// 		"Your attempt has been logged. " + req.user;
	// 	res.redirect("/logout");
	// });

	// route middleware to make sure a user is logged in
	function is_logged_in(req, res, next) {
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()) {
			winston.log("info", "app: routes: user login:", {
				user: req.user
			});
			return next();
		} else {
			res.redirect("/login");
		}
	}

  function is_authorized(req, res, next){
    path_url = req.originalUrl;
    if (req.originalUrl.includes(req.user.local.group) || req.user.local.group.includes("manager") ) {
      return next();
    }
    else {
      req.session.message = "Hey what are you doing?\nUNAUTHORIZED REQUEST...\nDOCMENTED";
      res.redirect("/" + req.user.local.group);
    }
  }

	function notify_after_process_end(process_id, args, data) {
		process_id.on("exit", function(code) {
			if (code === 0) {
				winston.log("debug", "app: routes: download: success", {
					file: path_to_archive
				});
				setTimeout(function(){
	        args.io.to(args.table).emit('download', data);
	      }, 10000);

			} else {
				winston.log("warning", "app: routes: download: failure", {
					file: path_to_archive
				});
			}
		});
	}
};
