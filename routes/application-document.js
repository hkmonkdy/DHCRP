exports.get = function(res){
  res.render('../views/application-document', { applicationId : null });
};

exports.next = function(req, res, controllerMongoDB, fs){
  saveDocuments(req, controllerMongoDB, fs, function(applicationId){
    //res.render('../views/application-confirmation', { applicationId : applicationId });
  });
};

exports.previous = function(req, res, controllerMongoDB){
  saveDocuments(req, controllerMongoDB, function(applicationId){
    res.render('../views/application-helper', { applicationId : applicationId });
  });
};

function saveDocuments(req, controllerMongoDB, fs, next){
	var applicationId = req.body.applicationId;
	console.log("--------------------------------------");
	console.log(applicationId);
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
			application.documents[count].originalName = file.originalname;
			application.documents[count].fileName = file.name;
			application.documents[count].mimeType = file.mimetype;
			
			count++;
		}
		
		
	
		controllerMongoDB.saveApplication(application, function(err){
		  if(err){
			console.log(asdasda);
			console.log(err);
		  }else{
			next(applicationId);
		  }
		});
	  });
	}
	
	next();
}