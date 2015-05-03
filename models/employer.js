var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysql15leo',
  database : 'dhcrp'
});

exports.create = function(applicationId, employer, done){
	var fieldString = "applicationId";
	var valueString = applicationId;
	
	if(employer.firstName){
	  fieldString += ", lastName";
	  valueString += ", '" + employer.lastName + "'";
	}
	
	if(employer.firstName){
	  fieldString += ", firstName";
	  valueString += ", '" + employer.firstName + "'";
	}
	
	if(employer.HKID){
	  fieldString += ", HKID";
	  valueString += ", '" + employer.HKID + "'";
	}
	
	if(employer.gender){
	  fieldString += ", gender";
	  valueString += ", '" + employer.gender + "'";
	}
	
	if(employer.chineseName){
	  fieldString += ", chineseName";
	  valueString += ", '" + employer.chineseName + "'";
	}
	
	if(employer.DOB){
	  fieldString += ", DOB";
	  valueString += ", '" + employer.DOB + "'";
	}
	
	if(employer.passportNumber){
	  fieldString += ", passportNumber";
	  valueString += ", '" + employer.passportNumber + "'";
	}
	
	if(employer.nationality){
	  fieldString += ", nationality";
	  valueString += ", '" + employer.nationality + "'";
	}
	
	if(employer.occupation){
	  fieldString += ", occupation";
	  valueString += ", '" + employer.occupation + "'";
	}
	
	if(employer.address1){
	  fieldString += ", address1";
	  valueString += ", '" + employer.address1 + "'";
	}
	
	if(employer.address2){
	  fieldString += ", address2";
	  valueString += ", '" + employer.address2 + "'";
	}
	
	if(employer.isAddSameAsOldContract){
	  fieldString += ", isAddSameAsOldContract";
	  valueString += ", " + employer.isAddSameAsOldContract;
	}
	
	if(employer.contactNumber){
	  fieldString += ", contactNumber";
	  valueString += ", '" + employer.contactNumber + "'";
	}
	
	if(employer.homeNumber){
	  fieldString += ", homeNumber";
	  valueString += ", '" + employer.homeNumber + "'";
	}
	
	if(employer.email){
	  fieldString += ", email";
	  valueString += ", '" + employer.email + "'";
	}
	
	if(employer.numOfAdult){
	  fieldString += ", numOfAdult";
	  valueString += ", " + employer.numOfAdult;
	}
	
	if(employer.numOfChild){
	  fieldString += ", numOfChild";
	  valueString += ", " + employer.numOfChild;
	}
	
	if(employer.numOfBaby){
	  fieldString += ", numOfBaby";
	  valueString += ", " + employer.numOfBaby;
	}
	
	if(employer.numOfPreBorn){
	  fieldString += ", numOfPreBorn";
	  valueString += ", " + employer.numOfPreBorn;
	}
	
	if(employer.numOfSpecialCare){
	  fieldString += ", numOfSpecialCare";
	  valueString += ", " + employer.numOfSpecialCare;
	}
	
	if(employer.numOfDH){
	  fieldString += ", numOfDH";
	  valueString += ", " + employer.numOfDH;
	}
	
	if(employer.houseHoldIncome){
	  fieldString += ", houseHoldIncome";
	  valueString += ", " + employer.houseHoldIncome;
	}
	
	if(employer.isEmployerSameAdd){
	  fieldString += ", isEmployerSameAdd";
	  valueString += ", " + employer.isEmployerSameAdd;
	}
	
	if(employer.apartmentTypeId){
	  fieldString += ", apartmentTypeId";
	  valueString += ", " + employer.apartmentTypeId;
	}
	
	if(employer.hasIndividualRoomDH){
	  fieldString += ", hasIndividualRoomDH";
	  valueString += ", " + employer.hasIndividualRoomDH;
	}
	
	if(employer.apartmentArea){
	  fieldString += ", apartmentArea";
	  valueString += ", " + employer.apartmentArea;
	}
	
	if(employer.numOfRoom){
	  fieldString += ", numOfRoom";
	  valueString += ", " + employer.numOfRoom;
	}
	
	if(employer.DHRoomArea){
	  fieldString += ", DHRoomArea";
	  valueString += ", " + employer.DHRoomArea;
	}
	
	if(employer.numOfFamilyInDHRoom){
	  fieldString += ", numOfFamilyInDHRoom";
	  valueString += ", " + employer.numOfFamilyInDHRoom;
	}

	connection.query('INSERT INTO employer (' + fieldString + ') VALUES (' + valueString + ')', function(err, rows, fields) {
	  connection.end();
	  if (!err){
		done(rows['insertId']);
	  }else{
		console.log('Error while performing Query.');
	  }
	});
}

exports.delete = function(applicationId, done){
  connection.query('DELETE FROM employer WHERE applicationid=' + applicationId, function(err, rows, fields) {
	connection.end();
	if (!err){
      done();
	}else{
      console.log('Error while performing Query.');
	}
  });
}