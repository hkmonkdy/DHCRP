var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysql15leo',
  database : 'dhcrp'
});

exports.create = function(applicationId, employerFamily, done){
	var fieldString = "applicationId";
	var valueString = applicationId;
	
	if(employerFamily.name){
	  fieldString += ", name";
	  valueString += ", '" + employerFamily.name + "'";
	}
	
	if(employerFamily.birthYear){
	  fieldString += ", birthYear";
	  valueString += ", " + employerFamily.birthYear;
	}
	
	if(employerFamily.relationship){
	  fieldString += ", relationship";
	  valueString += ", '" + employerFamily.relationship + "'";
	}
	
	if(employerFamily.HKID){
	  fieldString += ", HKID";
	  valueString += ", '" + employerFamily.HKID + "'";
	}
	
	if(employerFamily.isDHRoom){
	  fieldString += ", isDHRoom";
	  valueString += ", " + employerFamily.isDHRoom;
	}
	
	if(employerFamily.orderNum){
	  fieldString += ", orderNum";
	  valueString += ", " + employerFamily.orderNum;
	}

	connection.query('INSERT INTO employer_family (' + fieldString + ') VALUES (' + valueString + ')', function(err, rows, fields) {
	  connection.end();
	  if (!err){
		done(rows['insertId']);
	  }else{
		console.log('Error while performing Query. - '+err);
	  }
	});
}

exports.delete = function(applicationId, done){
  connection.query('DELETE FROM employer_family WHERE applicationid=' + applicationId, function(err, rows, fields) {
	connection.end();
	if (!err){
      done();
	}else{
      console.log('Error while performing Query.');
	}
  });
}