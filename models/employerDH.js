var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysql15leo',
  database : 'dhcrp'
});

exports.create = function(applicationId, employedDH, done){
	var fieldString = "applicationId";
	var valueString = applicationId;
	
	if(employedDH.name){
	  fieldString += ", name";
	  valueString += ", '" + employedDH.name + "'";
	}
	
	if(employedDH.HKID){
	  fieldString += ", HKID";
	  valueString += ", '" + employedDH.HKID + "'";
	}
	
	if(employedDH.VISADueDate){
	  fieldString += ", VISADueDate";
	  valueString += ", '" + employedDH.VISADueDate + "'";
	}
	
	if(employedDH.employerName){
	  fieldString += ", employerName";
	  valueString += ", '" + employedDH.employerName + "'";
	}

	connection.query('INSERT INTO employer_dh (' + fieldString + ') VALUES (' + valueString + ')', function(err, rows, fields) {
	  connection.end();
	  if (!err){
		done(rows['insertId']);
	  }else{
		console.log('Error while performing Query. - '+err);
	  }
	});
}

exports.delete = function(applicationId, done){
  connection.query('DELETE FROM employer_dh WHERE applicationid=' + applicationId, function(err, rows, fields) {
	connection.end();
	if (!err){
      done();
	}else{
      console.log('Error while performing Query.');
	}
  });
}