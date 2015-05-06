var Person = db.define("application", {
	applicationId		: { type: "integer", unique: true },
	status				: "integer",
	createOn			: { type: "date", time: true },
	updateOn			: { type: "date", time: true }
}, {
	methods: {},
	validations: {}
});