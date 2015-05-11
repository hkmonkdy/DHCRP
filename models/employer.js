var orm = require("orm");
var db = orm.connect("mysql://root:mysql15leo@localhost/dhcrp", function (err, db) {
    if (err) {
        console.log("Could not connect to database!");
        return;
    }
});

var Employer = db.define("employer", {
	employerId				: { type: "integer", unique: true },
	lastName				: "text",
	firstName				: "text",
	HKID					: "text",
	gender					: "text",
	chineseName				: "text",
	DOB						: { type: "date", time: false },
	passportType			: "text",
	passportNumber			: "text",
	nationality				: "text",
	occupation				: "text",
	address1				: "text",
	address2				: "text",
	isAddSameAsOldContract	: "integer",
	contactNumber			: "text",
	homeNumber				: "text",
	email					: "text",
	numOfAdult				: "integer",
	numOfChild				: "integer",
	numOfBaby				: "integer",
	numOfPreBorn			: "integer",
	numOfSpecialCare		: "integer",
	numOfDH					: "integer",
	houseHoldIncome			: "integer",
	isEmployerSameAdd		: "integer",
	apartmentTypeId			: "integer",
	hasIndividualRoomDH		: "integer",
	apartmentArea			: "integer",
	numOfRoom				: "integer",
	DHRoomArea				: "integer",
	numOfFamilyInDHRoom		: "integer",
	applicationId			: { type: "integer", unique: true }
},{
	id	:	"employerId"
});

exports.create = function(applicationId, employer, done){

	Employer.create([{
		lastName				: (employer.lastName)? employer.lastName: null,
		firstName				: (employer.firstName)? employer.firstName: null,
		HKID					: (employer.HKID)? employer.HKID: null,
		gender					: (employer.gender)? employer.gender: null,
		chineseName				: (employer.chineseName)? employer.chineseName: null,
		DOB						: (employer.DOB)? employer.DOB: null,
		//passportType			: (employer.passportType)? employer.passportType: null,
		passportNumber			: (employer.passportNumber)? employer.passportNumber: null,
		nationality				: (employer.nationality)? employer.nationality: null,
		occupation				: (employer.occupation)? employer.occupation: null,
		address1				: (employer.address1)? employer.address1: null,
		address2				: (employer.address2)? employer.address2: null,
		isAddSameAsOldContract	: (employer.isAddSameAsOldContract)? employer.isAddSameAsOldContract: null,
		contactNumber			: (employer.contactNumber)? employer.contactNumber: null,
		homeNumber				: (employer.homeNumber)? employer.homeNumber: null,
		email					: (employer.email)? employer.email: null,
		numOfAdult				: (employer.numOfAdult)? employer.numOfAdult: 0,
		numOfChild				: (employer.numOfChild)? employer.numOfChild: 0,
		numOfBaby				: (employer.numOfBaby)? employer.numOfBaby: 0,
		numOfPreBorn			: (employer.numOfPreBorn)? employer.numOfPreBorn: 0,
		numOfSpecialCare		: (employer.numOfSpecialCare)? employer.numOfSpecialCare: 0,
		numOfDH					: (employer.numOfDH)? employer.numOfDH: 0,
		houseHoldIncome			: (employer.houseHoldIncome)? employer.houseHoldIncome: null,
		isEmployerSameAdd		: (employer.isEmployerSameAdd)? employer.isEmployerSameAdd: 1,
		apartmentTypeId			: (employer.apartmentTypeId)? employer.apartmentTypeId: null,
		hasIndividualRoomDH		: (employer.hasIndividualRoomDH)? employer.hasIndividualRoomDH: 1,
		apartmentArea			: (employer.apartmentArea)? employer.apartmentArea: null,
		numOfRoom				: (employer.numOfRoom)? employer.numOfRoom: null,
		DHRoomArea				: (employer.DHRoomArea)? employer.DHRoomArea: null,
		numOfFamilyInDHRoom		: (employer.numOfFamilyInDHRoom)? employer.numOfFamilyInDHRoom: 0,
		applicationId			: applicationId
	}], function (err, employer) {
		//console.log(employer.employerId);
		console.log(err);
		console.log(employer);
		done(employer.employerId)
	});
}

exports.update = function(applicationId, done){
	Application.one({ applicationId : applicationId}, function (err, application) {
		application.updateOn = new Date();
		application.save(done);
	});
}