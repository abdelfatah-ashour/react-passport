const express = require("express");
const router = express.Router();
const { register, login, isAuth } = require("../controllers/userCTRL");

router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/auth/posts").get(isAuth, (req, res, next) => {
	res.send("posts");
});

module.exports = router;
