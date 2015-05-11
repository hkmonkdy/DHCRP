module.exports = function(db){
    return db.define("application", {
		applicationId		: { type: "integer", unique: true },
		statusId			: "integer",
		createOn			: { type: "date", time: true },
		updateOn			: { type: "date", time: true }
	},{
		id	:	"applicationId"
	});
}