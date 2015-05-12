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

app.use('/application-step1', function(err, req, res) {
	routeApplication.step1
});

app.post('/application-step1-next', function(err, req, res) {
	routeApplication.step1Next(req, res,controllerMongoDB)
});
/*
app.post('/application-step2-next', routeApplication.step2Next(req, res,controllerMongoDB));
app.post('/application-step2-previous', routeApplication.step2Previous(controllerMongoDB));
app.post('/application-step3-next', routeApplication.step3Next(req, res,controllerMongoDB));
app.post('/application-step3-previous', routeApplication.step3Previous(controllerMongoDB));
app.post('/application-step4-next', routeApplication.step4Next(req, res,controllerMongoDB));
app.post('/application-step4-previous', routeApplication.step4Previous(req, res,controllerMongoDB));

app.use('/application-step2', routeApplication.step3Previous(req, res,controllerMongoDB));
app.use('/application-step3', routeApplication.step2Next(req, res,controllerMongoDB));
app.use('/application-step4', routeApplication.step3Next(req, res,controllerMongoDB));

app.post('/inquiry', routeIndex.inquiry(req, res,controllerMongoDB));
app.post('/contact', routeIndex.contact(req, res,controllerMongoDB));
*/
app.use('/', routeIndex.index);