module.exports = () => {
	process.on("uncaughtException", (error) => {
		console.log(error.message);
	});
	process.on("unhandledRejection", (error) => {
		console.log(error);
	});
};
