const User = require("../models/userModel");

function Passport(passport, app) {
  // passport config
  const passport_JS = require("passport");
  const FacebookStrategy = require("passport-facebook").Strategy;
  const GoogleStrategy = require("passport-google-oauth2").Strategy;
  const GitHubStrategy = require("passport-github2");

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

  app.use(passport.initialize());

  // Facebook Strategy
  passport_JS.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.BACKEND_BASEURL}/auth/facebook/callback`,
      },
      (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile); // return profile info
      },
    ),
  );

  // Google Strategy
  passport_JS.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_BASEURL}/auth/google/callback`,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        done(null, profile); // return profile if everything done
      },
    ),
  );

  // github Strategy
  passport_JS.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_BASEURL}/auth/github/callback`,
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      },
    ),
  );

  // facebook routes
  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/login",
      scope: ["profile", "user"],
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect(`${process.env.CLIENT_BASEURL}/`);
    },
  );

  // google routes
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      successRedirect: "/auth/google/callback",
      failureRedirect: `${process.env.CLIENT_BASEURL}}/login"`,
      scope: ["profile"],
    }),
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: `${process.env.CLIENT_BASEURL}}/login"`,
    }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect(`${process.env.CLIENT_BASEURL}/`);
    },
  );

  // github routes
  app.get("/auth/github", passport.authenticate("github", { scope: ["user"] }));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect(`${process.env.CLIENT_BASEURL}/`);
    },
  );
}

module.exports = Passport;
