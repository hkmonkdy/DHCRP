var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routeIndex = require('./routes/index');
var routeApplication = require('./routes/application');

var controllerMongoDB = require('./controllers/mongoDB');

var app = module.exports = express();
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use('/application-step1', function(req, res) {
	routeApplication.step1(req, res);
});
app.post('/application-step1-next', function(req, res) {
	routeApplication.step1Next(req, res,controllerMongoDB);
});
app.post('/application-step2-next', function(req, res) {
	routeApplication.step2Next(req, res,controllerMongoDB);
});
app.post('/application-step2-previous', function(req, res) {
	routeApplication.step2Previous(req, res,controllerMongoDB);
});
app.post('/application-step3-next', function(req, res) {
	routeApplication.step3Next(req, res,controllerMongoDB);
});
app.post('/application-step3-previous', function(req, res) {
	routeApplication.step3Previous(req, res,controllerMongoDB);
});
app.post('/application-step4-next', function(req, res) {
	routeApplication.step4Next(req, res,controllerMongoDB);
});
app.post('/application-step4-previous', function(req, res) {
	routeApplication.step4Previous(req, res,controllerMongoDB);
});

app.use('/application-step2', function(req, res) {
	routeApplication.step3Previous(req, res,controllerMongoDB);
});
app.use('/application-step3', function(req, res) {
	routeApplication.step2Next(req, res,controllerMongoDB);
});
app.use('/application-step4', function(req, res) {
	routeApplication.step3Next(req, res,controllerMongoDB);
});

app.post('/inquiry', function(req, res) {
	routeIndex.inquiry(req, res,controllerMongoDB);
});
app.post('/contact', function(req, res) {
	routeIndex.contact(req, res,controllerMongoDB);
});

app.use('/', routeIndex.index);