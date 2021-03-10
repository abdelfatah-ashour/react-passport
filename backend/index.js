"strict mode";
require("./config/handleErrorServer")();
require("dotenv").config({
  path: "./config/.env",
});

require("./config/connectDB")(process.env.DB_URL);

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require("passport");

// middleware
app.use(
  cors({
    origin: "https://react-passport.vercel.app",
    methods: ["GET,PUT,PATCH,POST,DELETE"],
    credentials: true,
    path: "/",
  }),
);

// import Passport
require("./passport_configure/passport_configure")(passport, app);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

// routes
app.use("/api", require("./routes/userRoutes"));

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`server is working on port ${PORT}`));
