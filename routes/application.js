exports.step1 = function(req, res){
  res.render('../views/application-employer');
};

exports.step1Next = function(req, res, controllerMongoDB){
  var application = {};

  application._id = req.body.applicationId;

  //---------- Employer information -----------
  application.employer = {};

  application.employer.firstName = req.body.firstName;
  application.employer.lastName = req.body.lastName;
  application.employer.chineseName = req.body.chineseName;
  application.employer.DOB = req.body.DOB;
  application.employer.gender = req.body.gender;
  application.employer.HKID = req.body.HKID;
  application.employer.passportNumber = req.body.passportNumber;
  application.employer.nationality = req.body.nationality;
  application.employer.occupation = req.body.occupation;
  application.employer.address1 = req.body.address1;
  application.employer.address2 = req.body.address2;
  application.employer.contactNumber = req.body.contactNumber;
  application.employer.homeNumber = req.body.homeNumber;
  application.employer.email = req.body.email;
  
  application.employer.isEmployerSameAdd = req.body.isEmployerSameAdd;
  application.employer.houseHoldIncome = req.body.houseHoldIncome;
  application.employer.numOfAdult = req.body.numOfAdult;
  application.employer.numOfChild = req.body.numOfChild;
  application.employer.numOfBaby = req.body.numOfBaby;
  application.employer.numOfPreBorn = req.body.numOfPreBorn;
  application.employer.numOfSpecialCare = req.body.numOfSpecialCare;
  application.employer.numOfDH = req.body.numOfDH;
  
  application.employer.apartmentTypeId = req.body.apartmentType;
  application.employer.apartmentArea = req.body.apartmentArea;
  application.employer.numOfRoom = req.body.numOfRoom;
  application.employer.hasIndividualRoomDH = req.body.hasIndividualRoomDH;
  application.employer.DHRoomArea = req.body.DHRoomArea;
  //---------- Employer information[END] -----------
  
  //---------- Family member information -----------
  application.employer.familyMembers = [];

  var count = 1;
  for(var i=0; i<req.body.familyMemberNames.length; i++){
	if(req.body.familyMemberNames[i] != ""){
	  count++;
	  application.employer.familyMembers[i] = {};
	  application.employer.familyMembers[i].orderNum = count;
	  application.employer.familyMembers[i].name = req.body.familyMemberNames[i];
	  application.employer.familyMembers[i].birthYear = req.body.familyMemberBirthYears[i];
	  application.employer.familyMembers[i].relationship = req.body.familyMemberRelationships[i];
	  application.employer.familyMembers[i].HKID = req.body.familyMemberHKIDs[i];
	}
  }
  //---------- Family member information[END] -----------
  
  //---------- Employed DH information -----------
  application.employer.employedDHs = [];

  count = 0;
  for(var i=0; i<req.body.employedDHNames.length; i++){
	if(req.body.employedDHNames[i] != ""){
	  count++;
	  application.employer.employedDHs[i] = {};
	  application.employer.employedDHs[i].orderNum = count;
	  application.employer.employedDHs[i].name = req.body.employedDHNames[i];
	  application.employer.employedDHs[i].HKID = req.body.employedDHHKIDs[i];
	  application.employer.employedDHs[i].VISADueDate = req.body.employedDHVISADueDates[i];
	  application.employer.employedDHs[i].employerName = req.body.employedDHEmployerNames[i];
	}
  }
  //---------- Employed DH information[END] -----------
  
  controllerMongoDB.saveApplication(application, function(){
	//res.render('../views/application-helper');
  });

  res.render('../views/application-helper');
};

exports.step2Next = function(req, res, controllerMongoDB){
  res.render('../views/application-document');
};

exports.step2Previous = function(req, res, controllerMongoDB){
  res.render('../views/application-employer');
};

exports.step3Next = function(req, res, controllerMongoDB){
  res.render('../views/application-confirmation');
};

exports.step3Previous = function(req, res, controllerMongoDB){
  res.render('../views/application-helper');
};

exports.step4Next = function(req, res, controllerMongoDB){
  res.render('../views/index');
};

exports.step4Previous = function(req, res, controllerMongoDB){
  res.render('../views/application-document');
};