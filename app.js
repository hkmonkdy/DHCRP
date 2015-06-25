var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

var routeIndex = require('./routes/index');
var routeApplicationEmployer = require('./routes/application-employer');
var routeApplicationHelper = require('./routes/application-helper');
var routeApplicationDocument = require('./routes/application-document');
var routeApplicationConfirmation = require('./routes/application-confirmation');

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

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(multer({dest: './uploads/'}))

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


app.get('/application-step1', function(req, res) {
	routeApplicationEmployer.get(req, res, controllerMongoDB);
});
app.get('/application-step2', function(req, res) {
	routeApplicationHelper.get(req, res, controllerMongoDB);
});
app.get('/application-step3', function(req, res) {
	routeApplicationDocument.get(req, res, controllerMongoDB);
});
app.get('/application-step4', function(req, res) {
	routeApplicationConfirmation.get(req, res, controllerMongoDB);
});


app.post('/application-step1', function(req, res) {
	routeApplicationEmployer.post(req, res, controllerMongoDB);
});
app.post('/application-step2', function(req, res) {
	routeApplicationHelper.post(req, res, controllerMongoDB);
});
app.post('/application-step3', function(req, res) {
	routeApplicationDocument.post(req, res, controllerMongoDB, fs);
});
app.post('/application-step4', function(req, res) {
	routeApplicationConfirmation.post(req, res, controllerMongoDB);
});


app.post('/inquiry', function(req, res) {
	routeIndex.inquiry(req, res, controllerMongoDB);
});
app.post('/contact', function(req, res) {
	routeIndex.contact(req, res, controllerMongoDB);
});

app.use('/', routeIndex.index);