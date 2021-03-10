const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	CPassword: String,
	picture: String,
});

module.exports = mongoose.model("user", userSchema);
