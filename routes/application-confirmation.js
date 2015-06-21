exports.get = function(res){
  res.render('../views/application-document', { applicationId : null });
};

exports.next = function(req, res, controllerMongoDB){
  saveDocuments(req, controllerMongoDB, function(applicationId){
    //res.render('../views/application-confirmation', { applicationId : applicationId });
  }, res);
};

exports.previous = function(req, res, controllerMongoDB){
  saveDocuments(req, controllerMongoDB, function(applicationId){
    res.render('../views/application-helper', { applicationId : applicationId });
  });
};

function saveDocuments(req, controllerMongoDB, next, res){
/*
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
*/

	var dirname = require('path').dirname(__dirname);
	console.log(dirname);
    var filename = req.files.file.name;
	console.log(req.files);
	console.log(filename);
    var path = req.files.file.path;
	console.log(path);
    var type = req.files.file.mimetype;
	console.log(type);
      
    //var read_stream =  fs.createReadStream(dirname + '/' + path);

//	controllerMongoDB.testout(res);
	next();
}