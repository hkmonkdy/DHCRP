exports.get = function(req, res, controllerMongoDB){
  var applicationId = req.query.applicationId;
  
  if(applicationId){
	controllerMongoDB.getApplication(applicationId, function(err, application){
	  if(err){
		console.log(err);
	  }else{
		res.render('../views/application-helper', { application : application });
	  }
	});
  }else{
	var application = initApplication();
	res.render('../views/application-employer', { application : application });
  }
};

exports.post = function(req, res, controllerMongoDB){	
  saveDomesticHelper(req, controllerMongoDB, function(application){
	if(req.body.prevBtn){
	  res.render('../views/application-employer', { application : application });
	}else{
	  res.render('../views/application-document', { application : application });
	}
  });
};

function saveDomesticHelper(req, controllerMongoDB, next){
  var applicationId = req.body.applicationId;
  
  //---------- Domestic Helper information -----------
  var domesticHelper = {};
  
  domesticHelper.firstName = req.body.firstName;
  domesticHelper.middleName = req.body.middleName;
  domesticHelper.lastName = req.body.lastName;
  domesticHelper.HKID = req.body.HKID;
  domesticHelper.HKIDIssueDate = req.body.HKIDIssueDate;
  domesticHelper.DOB = req.body.DOB;
  domesticHelper.gender = req.body.gender;
  domesticHelper.birthPlace = req.body.birthPlace;
  domesticHelper.Nationality = req.body.Nationality;
  domesticHelper.maritalStatusId = req.body.maritalStatusId;
  domesticHelper.addOfResidence1 = req.body.addOfResidence1;
  domesticHelper.addOfResidence2 = req.body.addOfResidence2;
  domesticHelper.contactNumber = req.body.contactNumber;
  domesticHelper.email = req.body.email;
  domesticHelper.familyContactName = req.body.familyContactName;
  domesticHelper.familyContactNumber = req.body.familyContactNumber;
  domesticHelper.postRenewalArrangement = req.body.postRenewalArrangement;
  domesticHelper.postRenewalTravelStartDate = req.body.postRenewalTravelStartDate;
  domesticHelper.postRenewalTravelEndDate = req.body.postRenewalTravelEndDate;
  domesticHelper.postRenewalPostponeReason = req.body.postRenewalPostponeReason;
  domesticHelper.passortNumber = req.body.passortNumber;
  domesticHelper.passportIssueDate = req.body.passportIssueDate;
  domesticHelper.passportDueDate = req.body.passportDueDate;
  domesticHelper.passportIssueCountry = req.body.passportIssueCountry;
  domesticHelper.VISAIssueDate = req.body.VISAIssueDate;
  domesticHelper.VISADueDate = req.body.VISADueDate;
  //---------- Domestic Helper information[END] -----------
  
  if(applicationId){
	controllerMongoDB.getApplication(applicationId, function(err, application){
	  application.domesticHelper = domesticHelper;
	
	  controllerMongoDB.saveApplication(application, function(err){
		if(err){
		  console.log(err);
		}else{
		  next(application);
		}
	  });
	});
  }
}

function initApplication(){
  var application = {};
  application.employer = {};
  
  return application;
}