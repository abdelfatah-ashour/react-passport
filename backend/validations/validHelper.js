const joi = require("joi");

const validRegister = (user) => {
	const schema = joi.object({
		username: joi.string().min(3).max(25).required(),
		email: joi.string().min(10).max(55).required().email(),
		password: joi.string().min(8).max(255).required(),
		CPassword: joi.string().valid(joi.ref("password")).required(),
	});

	return schema.validate(user);
};

module.exports = { validRegister };
