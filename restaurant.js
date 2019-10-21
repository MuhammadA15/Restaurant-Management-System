#!/root/.nvm/versions/node/v8.12.0/bin/node

// set up ======================================================================
// get all the tools we need
var conf     = require('config');
var express  = require('express'),
  engine     = require('ejs-mate'),
  app        = express();

var helmet   = require('helmet');
var port     = conf.get('app.port.prd');

var server   = require('http').Server(app);
var clientio = require('socket.io')(server);

var fs       = require("fs");
var path     = require('path');

var passport = require('passport');
var mongoose = require('mongoose');
var flash    = require('connect-flash');
var path     = require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


const NodeCache  = require( "node-cache" );
const myCache    = new NodeCache({ stdTTL: 3600, checkperiod: 60 });

require('./config/passport')(passport, fs);
mongoose.connect('mongodb://' + conf.get('database.login.url') + conf.get('database.login.name')); // connect to our database



// set up our express application
app.use(helmet());

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true })); //get form information
app.use(bodyParser.json());

// set up ejs for templating
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

// required for passport
app.use(session(conf.get('app.session')));
app.use(function(req, res, next){
  res.io = clientio;
  next();
});
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());
// use connect-flash for flash messages stored in session
app.use(flash());

app.use(express.static(path.join(__dirname + '/public')));
// routes ======================================================================
// require('./app/limit.js')(limiter);
require('./app/routes.js')(app, passport, clientio);

// launch ======================================================================
require('./app/clients/sockets.js')(clientio);
// app.listen(port);
server.listen(port, function(){
  console.log('listening on *:' + port);
});
