var multiparty = require('multiparty');

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
  saveDomesticHelper(req, controllerMongoDB, function(applicationId){
    res.render('../views/application-document', { applicationId : applicationId });
  });
};

exports.step2Previous = function(req, res, controllerMongoDB){
  saveDomesticHelper(req, controllerMongoDB, function(applicationId){
    res.render('../views/application-employer', { applicationId : applicationId });
  });
};

exports.step3Next = function(req, res, controllerMongoDB){
  saveDocuments(req, controllerMongoDB, function(applicationId){
    res.render('../views/application-confirmation', { applicationId : applicationId });
  });
};

exports.step3Previous = function(req, res, controllerMongoDB){
  saveDocuments(req, controllerMongoDB, function(applicationId){
    res.render('../views/application-helper', { applicationId : applicationId });
  });
};

exports.step4Next = function(req, res, controllerMongoDB){
  res.render('../views/index');
};

exports.step4Previous = function(req, res, controllerMongoDB){
  res.render('../views/application-document');
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
		  next(applicationId);
		}
	  });
	});
  }
}

function saveDocuments(req, controllerMongoDB, next){
  var applicationId = req.body.applicationId;
  
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var file = files.file[0];
    var contentType = file.headers['content-type'];
    var tmpPath = file.path;
    var extIndex = tmpPath.lastIndexOf('.');
    var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
    // uuid is for generating unique filenames.
    var fileName = uuid.v4() + extension;
    var destPath = appRoot +'/../public/images/profile_images/' + fileName;

    // Server side file type checker.
    if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
        fs.unlink(tmpPath);
        return res.status(400).send('Unsupported file type.');
    }

    var is = fs.createReadStream(tmpPath);
    var os = fs.createWriteStream(destPath);

    if(is.pipe(os)) {
        fs.unlink(tmpPath, function (err) { //To unlink the file from temp path after copy
            if (err) {
                console.log(err);
            }
        });
        return res.json(destPath);
    }else
        return res.json('File not uploaded');
  });
  
  //---------- Domestic Helper information -----------
  var document = {};
  
  document.employerId = req.body.firstName;
  document.employerPassport_photo = req.body.middleName;
  document.employerPassport_proof = req.body.lastName;
  document.employerLivingAddress = req.body.HKID;
  document.employerOther = req.body.HKID;
  
  document.dhId = req.body.HKIDIssueDate;
  document.dhPassport_photo = req.body.DOB;
  document.dhPassport_signDate = req.body.gender;
  document.dhPassport_dueDate = req.body.birthPlace;
  document.dhContract = req.body.Nationality;
  document.dhBodyCheck = req.body.maritalStatusId;
  document.dhOther = req.body.maritalStatusId;
  //---------- Domestic Helper information[END] -----------
  
  if(applicationId){
	controllerMongoDB.getApplication(applicationId, function(err, application){
	  application.document = document;
	
	  controllerMongoDB.saveApplication(application, function(err){
		if(err){
		  console.log(err);
		}else{
		  next(applicationId);
		}
	  });
	});
  }
}