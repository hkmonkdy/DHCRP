var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dhcrp'); 




var conn = mongoose.connection; 
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var Application = require('../models/application');
var ApplicationInquiry = require('../models/application_inquiry');
var GeneralInquiry = require('../models/general_inquiry');

const APPLICATION_STATUS_NOT_SUBMITTED = 1;

module.exports = {
	getApplication: function (applicationId, next) {
		Application.findOne({ _id: applicationId }, function (err, dbApplication) {
			return next(err, dbApplication);
		});
	},
	
	saveApplication: function (submittedApplication, next) {
		if(submittedApplication._id){
			Application.findOne({ _id: submittedApplication._id }, function (err, dbApplication) {
				if (err)
					return next(err);
					
				if(!dbApplication)
					return next('No record found.');

				dbApplication.statusId = submittedApplication.statusId;
				dbApplication.employer = submittedApplication.employer;
				dbApplication.domesticHelper = submittedApplication.domesticHelper;
				dbApplication.updateOn = Date.now();

				dbApplication.save(function (err) {
					return next(err);
				});
			});
		}else{
			var newApplication = new Application();

			newApplication.statusId = APPLICATION_STATUS_NOT_SUBMITTED;
			newApplication.employer = submittedApplication.employer;
			newApplication.domesticHelper = submittedApplication.domesticHelper;
			
			newApplication.save(function (err) {
				return next(err, newApplication);
			});
		}
	},
	
	createApplicationInquiry: function (submittedApplicationInquiry, next) {
		var newApplicationInquiry = new ApplicationInquiry();

		newApplicationInquiry.queryInformation = submittedApplicationInquiry.queryInformation;
		
		newApplicationInquiry.save(function (err) {
			return next(err, newApplicationInquiry);
		});
	},
	
	createGeneralInquiry: function (submittedGeneralInquiry, next) {
		var newGeneralInquiry = new GeneralInquiry();

		newGeneralInquiry.name = submittedGeneralInquiry.name;
		newGeneralInquiry.contactNumber = submittedGeneralInquiry.contactNumber;
		newGeneralInquiry.email = submittedGeneralInquiry.email;
		newGeneralInquiry.title = submittedGeneralInquiry.title;
		newGeneralInquiry.content = submittedGeneralInquiry.content;
		
		newGeneralInquiry.save(function (err) {
			return next(err, newGeneralInquiry);
		});
	},
	
	testin: function (read_stream, filename) {
		console.log('open');
		var gfs = Grid(conn.db);
		
		var writestream = gfs.createWriteStream({
			filename: filename
		});
		read_stream.pipe(writestream);
	},
	
	testout: function (res) {
		var gfs = Grid(conn.db);
		
		gfs.files.find({filename: 'mongo_file.txt'}).toArray(function (err, files) {
			if (err) {
				res.json(err);
			}
			if (files.length > 0) {
				var mime = 'text/plain';
				res.set('Content-Type', mime);
				var read_stream = gfs.createReadStream({filename: 'mongo_file.txt'});
				read_stream.pipe(res);
			} else {
				res.json('File Not Found');
			}
		});
		
		//write content to file system
		var fs_write_stream = fs.createWriteStream('write.txt');
		 
		//read from mongodb
		var readstream = gfs.createReadStream({
			 filename: 'mongo_file.txt'
		});
		readstream.pipe(fs_write_stream);
		fs_write_stream.on('close', function () {
			 console.log('file has been written fully!');
		});
	}
}