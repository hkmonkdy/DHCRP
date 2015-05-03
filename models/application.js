var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysql15leo',
  database : 'dhcrp'
});

const APPLICATION_STATUS_NOT_SUBMITTED = 1;
const APPLICATION_STATUS_SUBMITTED = 2;
const APPLICATION_STATUS_PROCESSING = 3;
const APPLICATION_STATUS_COMPLETED = 4;
const APPLICATION_STATUS_NOT_CANCELLED = 5;

exports.create = function(done){
  connection.query('INSERT INTO application (statusId) VALUES (' + APPLICATION_STATUS_NOT_SUBMITTED + ')', function(err, rows, fields) {
	connection.end();
	if (!err){
	  done(rows['insertId']);
	}else{
      console.log('Error while performing Query.');
	}
  });
}

exports.update = function(applicationId, done){
  connection.query('UPDATE application SET updateOn = current_timestamp() WHERE applicationId=' + applicationId, function(err, rows, fields) {
	connection.end();
	if (!err){
      done();
	}else{
      console.log('Error while performing Query.');
	}
  });
}