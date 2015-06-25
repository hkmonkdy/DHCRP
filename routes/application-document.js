exports.get = function(req, res, controllerMongoDB){
  var applicationId = req.query.applicationId;
  
  if(applicationId){
	controllerMongoDB.getApplication(applicationId, function(err, application){
	  if(err){
		console.log(err);
	  }else{
		res.render('../views/application-document', { application : application });
	  }
	});
  }else{
	var application = initApplication();
	res.render('../views/application-employer', { application : application });
  }
};

exports.post = function(req, res, controllerMongoDB, fs){
  saveDocuments(req, controllerMongoDB, fs, function(application){
	if(req.body.prevBtn){
	  res.render('../views/application-helper', { application : application });
	}else{
	  res.render('../views/application-confirmation', { application : application });
	}
  });
};

function saveDocuments(req, controllerMongoDB, fs, next){
	var applicationId = req.body.applicationId;
	
	if(applicationId){
	  controllerMongoDB.getApplication(applicationId, function(err, application){
		application.documents = [];
		
		var count = 0;
		var dirname = require('path').dirname(__dirname);
    
		for (var key in req.files) {
			var file = req.files[key];
			var filename = file.name;
			var path = file.path;
			var type = file.mimetype;
			var read_stream =  fs.createReadStream(dirname + '/' + path);
			
			controllerMongoDB.testin(read_stream, filename);
			
			application.documents[count] = {};
			application.documents[count].documentType = key;
			application.documents[count].originalName = file.originalname;
			application.documents[count].fileName = file.name;
			application.documents[count].mimeType = file.mimetype;
			
			count++;
		}
	
		controllerMongoDB.saveApplication(application, function(err){
		  if(err){
			console.log(err);
		  }else{
			next(application);
			return;
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