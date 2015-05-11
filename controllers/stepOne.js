var modelApplication = require('../models/application');
var modelEmployer = require('../models/employer.js');
var modelEmployerFamily = require('../models/employerFamily.js');
var modelEmployerDH = require('../models/employerDH.js');

exports.save = function(applicationId, employer, familyMembers, employedDHs, done){
  if(applicationId){
	modelApplication.update(applicationId);
	modelEmployer.delete(applicationId);
	modelEmployerFamily.delete(applicationId);
	modelEmployerDH.delete(applicationId);
  }else{
	modelApplication.create(function(employer, applicationId){
	/*
	  modelEmployer.create(applicationId, employer, function(){
		
		for(var key in familyMembers){
		  modelEmployerFamily.create(applicationId, familyMembers[key], function(){
			for(var key in employedDHs){
			  modelEmployerDH.create(applicationId, employedDHs[key], done);
			}
		  });
		}
		
	  })
	  */
	});
  }

  

}