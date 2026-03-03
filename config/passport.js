const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongodb = require('../db/connect');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const db = mongodb.getDb().db();
    const users = db.collection("users");

    let user = await users.findOne({ googleId: profile.id });

    if (!user) {
      user = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value
      };
      await users.insertOne(user);
    }

    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;