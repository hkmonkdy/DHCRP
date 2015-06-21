exports.get = function(res){
  res.render('../views/application-employer', { applicationId : null });
};

exports.next = function(req, res, controllerMongoDB){
  var applicationId = req.body.applicationId;

  //---------- Employer information -----------
  var employer = {};

  employer.firstName = req.body.firstName;
  employer.lastName = req.body.lastName;
  employer.chineseName = req.body.chineseName;
  employer.DOB = req.body.DOB;
  employer.gender = req.body.gender;
  employer.HKID = req.body.HKID;
  employer.passportNumber = req.body.passportNumber;
  employer.nationality = req.body.nationality;
  employer.occupation = req.body.occupation;
  employer.address1 = req.body.address1;
  employer.address2 = req.body.address2;
  employer.contactNumber = req.body.contactNumber;
  employer.homeNumber = req.body.homeNumber;
  employer.email = req.body.email;
  
  employer.isEmployerSameAdd = req.body.isEmployerSameAdd;
  employer.houseHoldIncome = req.body.houseHoldIncome;
  employer.numOfAdult = req.body.numOfAdult;
  employer.numOfChild = req.body.numOfChild;
  employer.numOfBaby = req.body.numOfBaby;
  employer.numOfPreBorn = req.body.numOfPreBorn;
  employer.numOfSpecialCare = req.body.numOfSpecialCare;
  employer.numOfDH = req.body.numOfDH;
  
  employer.apartmentTypeId = req.body.apartmentType;
  employer.apartmentArea = req.body.apartmentArea;
  employer.numOfRoom = req.body.numOfRoom;
  employer.hasIndividualRoomDH = req.body.hasIndividualRoomDH;
  employer.DHRoomArea = req.body.DHRoomArea;
  //---------- Employer information[END] -----------
  
  //---------- Family member information -----------
  employer.familyMembers = [];

  var count = 1;
  for(var i=0; i<req.body.familyMemberNames.length; i++){
	if(req.body.familyMemberNames[i] != ""){
	  count++;
	  employer.familyMembers[i] = {};
	  employer.familyMembers[i].orderNum = count;
	  employer.familyMembers[i].name = req.body.familyMemberNames[i];
	  employer.familyMembers[i].birthYear = req.body.familyMemberBirthYears[i];
	  employer.familyMembers[i].relationship = req.body.familyMemberRelationships[i];
	  employer.familyMembers[i].HKID = req.body.familyMemberHKIDs[i];
	}
  }
  //---------- Family member information[END] -----------
  
  //---------- Employed DH information -----------
  employer.employedDHs = [];

  count = 0;
  for(var i=0; i<req.body.employedDHNames.length; i++){
	if(req.body.employedDHNames[i] != ""){
	  count++;
	  employer.employedDHs[i] = {};
	  employer.employedDHs[i].orderNum = count;
	  employer.employedDHs[i].name = req.body.employedDHNames[i];
	  employer.employedDHs[i].HKID = req.body.employedDHHKIDs[i];
	  employer.employedDHs[i].VISADueDate = req.body.employedDHVISADueDates[i];
	  employer.employedDHs[i].employerName = req.body.employedDHEmployerNames[i];
	}
  }
  //---------- Employed DH information[END] -----------
  
  if(applicationId){
	controllerMongoDB.getApplication(application, function(err, application){
	  application.employer = employer;
	
	  controllerMongoDB.saveApplication(application, function(err, application){
		res.render('../views/application-helper', { applicationId : application._id });
	  });
	});
  }else{
	var application = {};
	application.employer = employer;
	
	controllerMongoDB.saveApplication(application, function(err, application){
	  res.render('../views/application-helper', { applicationId : application._id });
	});
  }
};