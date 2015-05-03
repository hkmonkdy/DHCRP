var controllerStepOne = require('../controllers/stepOne');

exports.step1 = function(req, res){
  res.render('../views/application-employer');
};

exports.step1Next = function(req, res){
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
  var familyMembers = [];

  var count = 1;
  for(var i=0; i<req.body.familyMemberNames.length; i++){
	if(req.body.familyMemberNames[i] != ""){
	  count++;
	  familyMembers[i] = {};
	  familyMembers[i].orderNum = count;
	  familyMembers[i].name = req.body.familyMemberNames[i];
	  familyMembers[i].birthYear = req.body.familyMemberBirthYears[i];
	  familyMembers[i].relationship = req.body.familyMemberRelationships[i];
	  familyMembers[i].HKID = req.body.familyMemberHKIDs[i];
	}
  }
  //---------- Family member information[END] -----------
  
  //---------- Employed DH information -----------
  var employedDHs = [];

  count = 0;
  for(var i=0; i<req.body.employedDHNames.length; i++){
	if(req.body.employedDHNames[i] != ""){
	  count++;
	  employedDHs[i] = {};
	  employedDHs[i].orderNum = count;
	  employedDHs[i].name = req.body.employedDHNames[i];
	  employedDHs[i].HKID = req.body.employedDHHKIDs[i];
	  employedDHs[i].VISADueDate = req.body.employedDHVISADueDates[i];
	  employedDHs[i].employerName = req.body.employedDHEmployerNames[i];
	}
  }
  //---------- Employed DH information[END] -----------
  
  controllerStepOne.save(applicationId, employer, familyMembers, employedDHs, function(){
	console.log('Done');
  });
  
  res.render('../views/application-helper');
};

exports.step2Next = function(req, res){
  res.render('../views/application-document');
};

exports.step2Previous = function(req, res){
  res.render('../views/application-employer');
};

exports.step3Next = function(req, res){
  res.render('../views/application-confirmation');
};

exports.step3Previous = function(req, res){
  res.render('../views/application-helper');
};