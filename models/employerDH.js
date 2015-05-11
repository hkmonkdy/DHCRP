var orm = require("orm");
var db = orm.connect("mysql://root:mysql15leo@localhost/dhcrp", function (err, db) {
    if (err) {
        console.log("Could not connect to database!");
        return;
    }
});

var Application = db.define("application", {
	applicationId		: { type: "integer", unique: true },
	statusId			: "integer",
	createOn			: { type: "date", time: true },
	updateOn			: { type: "date", time: true }
},{
	id	:	"applicationId"
});

const APPLICATION_STATUS_NOT_SUBMITTED = 1;

exports.create = function(done){
	Application.create([{
		statusId : 1,
		createOn : new Date(),
		updateOn : new Date(),
	}], function (err, application) {
		done(application.applicationId);
	});
}

exports.update = function(applicationId, done){
	Application.one({ applicationId : applicationId}, function (err, application) {
		application.updateOn = new Date();
		application.save(done);
	});
}