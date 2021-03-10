const mongoose = require("mongoose");

module.exports = function name(url) {
	mongoose
		.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(() => {
			console.log(`connected database atlas`);
		})
		.catch((error) => {
			if (error) throw new Error(error.message);
		});
};
