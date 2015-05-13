exports.step1 = function(req, res){
  res.render('../views/application-employer', { applicationId : null });
};

exports.step1Next = function(req, res, controllerMongoDB){
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

exports.step2Next = function(req, res, controllerMongoDB){
  var applicationId = req.body.applicationId;
  
  //---------- Domestic Helper information -----------
  application.domesticHelper = {};
  
  application.domesticHelper.firstName = req.body.firstName;
  application.domesticHelper.middleName = req.body.middleName;
  application.domesticHelper.lastName = req.body.lastName;
  application.domesticHelper.HKID = req.body.HKID;
  application.domesticHelper.HKIDIssueDate = req.body.HKIDIssueDate;
  application.domesticHelper.DOB = req.body.DOB;
  application.domesticHelper.gender = req.body.gender;
  application.domesticHelper.birthPlace = req.body.birthPlace;
  application.domesticHelper.Nationality = req.body.Nationality;
  application.domesticHelper.maritalStatusId = req.body.maritalStatusId;
  application.domesticHelper.addOfResidence1 = req.body.addOfResidence1;
  application.domesticHelper.addOfResidence2 = req.body.addOfResidence2;
  application.domesticHelper.contactNumber = req.body.contactNumber;
  application.domesticHelper.email = req.body.email;
  application.domesticHelper.familyContactName = req.body.familyContactName;
  application.domesticHelper.familyContactNumber = req.body.familyContactNumber;
  application.domesticHelper.postRenewalArrangement = req.body.postRenewalArrangement;
  application.domesticHelper.postRenewalTravelStartDate = req.body.postRenewalTravelStartDate;
  application.domesticHelper.postRenewalTravelEndDate = req.body.postRenewalTravelEndDate;
  application.domesticHelper.postRenewalPostponeReason = req.body.postRenewalPostponeReason;
  application.domesticHelper.passortNumber = req.body.passortNumber;
  application.domesticHelper.passportIssueDate = req.body.passportIssueDate;
  application.domesticHelper.passportDueDate = req.body.passportDueDate;
  application.domesticHelper.passportIssueCountry = req.body.passportIssueCountry;
  application.domesticHelper.VISAIssueDate = req.body.VISAIssueDate;
  application.domesticHelper.VISADueDate = req.body.VISADueDate;
  //---------- Domestic Helper information[END] -----------
  
  if(applicationId){
	controllerMongoDB.getApplication(application, function(err, application){
	  application.domesticHelper = domesticHelper;
	
	  controllerMongoDB.saveApplication(application, function(err, application){
		res.render('../views/application-document', { applicationId : application._id });
	  });
	});
  }
};

exports.step2Previous = function(req, res, controllerMongoDB){
  var applicationId = req.body.applicationId;
  
  //---------- Domestic Helper information -----------
  application.domesticHelper = {};
  
  application.domesticHelper.firstName = req.body.firstName;
  application.domesticHelper.middleName = req.body.middleName;
  application.domesticHelper.lastName = req.body.lastName;
  application.domesticHelper.HKID = req.body.HKID;
  application.domesticHelper.HKIDIssueDate = req.body.HKIDIssueDate;
  application.domesticHelper.DOB = req.body.DOB;
  application.domesticHelper.gender = req.body.gender;
  application.domesticHelper.birthPlace = req.body.birthPlace;
  application.domesticHelper.Nationality = req.body.Nationality;
  application.domesticHelper.maritalStatusId = req.body.maritalStatusId;
  application.domesticHelper.addOfResidence1 = req.body.addOfResidence1;
  application.domesticHelper.addOfResidence2 = req.body.addOfResidence2;
  application.domesticHelper.contactNumber = req.body.contactNumber;
  application.domesticHelper.email = req.body.email;
  application.domesticHelper.familyContactName = req.body.familyContactName;
  application.domesticHelper.familyContactNumber = req.body.familyContactNumber;
  application.domesticHelper.postRenewalArrangement = req.body.postRenewalArrangement;
  application.domesticHelper.postRenewalTravelStartDate = req.body.postRenewalTravelStartDate;
  application.domesticHelper.postRenewalTravelEndDate = req.body.postRenewalTravelEndDate;
  application.domesticHelper.postRenewalPostponeReason = req.body.postRenewalPostponeReason;
  application.domesticHelper.passortNumber = req.body.passortNumber;
  application.domesticHelper.passportIssueDate = req.body.passportIssueDate;
  application.domesticHelper.passportDueDate = req.body.passportDueDate;
  application.domesticHelper.passportIssueCountry = req.body.passportIssueCountry;
  application.domesticHelper.VISAIssueDate = req.body.VISAIssueDate;
  application.domesticHelper.VISADueDate = req.body.VISADueDate;
  //---------- Domestic Helper information[END] -----------
  
  if(applicationId){
	controllerMongoDB.getApplication(applicationId, function(err, application){
	  application.domesticHelper = domesticHelper;
	
	  controllerMongoDB.saveApplication(application, function(err, application){
		res.render('../views/application-employer', { applicationId : application._id });
	  });
	});
  }
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