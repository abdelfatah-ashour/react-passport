const User = require("../models/userModel");
const { validRegister } = require("../validations/validHelper");
const { hash, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { serialize } = require("cookie");
const salt = 10;
module.exports = {
	register: (req, res) => {
		return new Promise(async (resolve, reject) => {
			const { username, email, password, CPassword } = req.body;

			// check error inputs from user
			const { error } = validRegister({ username, email, password, CPassword });
			if (error) return reject(error.details[0].message);

			// check if email is exists
			const isUser = await User.findOne({ email });

			// if exists reject friendly error to client
			if (isUser) {
				return reject("E-mail is exits");
			}

			//	NOT error && NOT exists
			//	so hashed password && confirm password with bcrypt
			const hashedPassword = await hash(password, salt);
			const hashedCPassword = await hash(CPassword, salt);

			// after hashed passwords create instance from User model
			const newUser = new User({
				username,
				email,
				password: hashedPassword,
				CPassword: hashedCPassword,
			});

			// save instance new user
			await newUser
				.save()
				.then((user) => {
					return resolve(user);
				})
				.catch((err) => {
					return reject(err);
				});
		})
			.then(() => {
				return res.status(201).json({
					success: true,
					message: "register successfully ♥",
				});
			})
			.catch((error) => {
				return res.status(400).json({
					success: false,
					message: error + " ⚠",
				});
			});
	},
	login: (req, res) => {
		return new Promise(async (resolve, reject) => {
			const { email, password } = req.body;

			// first : check if user is found
			// if not found send response with friendly error message
			// if founded so compared password
			// Not same Hashed send response with friendly error message
			// it is same send cookie with token and some initial data about user like a _ID and email and username
			const isUser = await User.findOne({ email }); // return object with suer details
			//TODO: don't tell user email or password is incorrect
			//	 just tell him is there error with email or password

			if (!isUser) return reject("email or password incorrect");

			const comparePassword = await compare(password, isUser.password);

			if (!comparePassword) return reject("email or password incorrect");

			const token = generateToken({ _id: isUser._id });
			// TODO: out client is different  site like www.example.com
			//	and our backend is other site like www.exampleXX.com

			res.setHeader(
				"Set-Cookie",
				serialize("auth", token, {
					httpOnly: process.env.NODE_ENV === "production" ? true : false,
					secure: process.env.NODE_ENV === "production" ? true : false,
					sameSite: process.env.NODE_ENV === "production" ? "none" : false,
					path: "/",
					maxAge: 60 * 60, // 1 hour
				})
			);

			return resolve("♥ login successfully");
		})
			.then((msg) => {
				return res.status(200).json({
					success: true,
					message: msg,
				});
			})
			.catch((error) => {
				return res.status(400).json({
					success: false,
					message: "⛔  " + error,
				});
			});
	},
	isAuth: (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			// check cookie include token auth
			const isUser = req.cookies.auth;
			if (!isUser) return reject("⚠  please register or login");

			//then check token if verify
			const decoded = await verify(isUser, process.env.ACCESS_TOKEN);
			if (!decoded) return reject("⚠  please register or login");

			req.user = decoded;
			resolve(next);
		})
			.then((Done) => {
				Done();
			})
			.catch((error) => {
				return res.status(403).json({
					success: false,
					message: error,
				});
			});
	},
};

const generateToken = (data) => {
	return sign(data, process.env.ACCESS_TOKEN);
};
