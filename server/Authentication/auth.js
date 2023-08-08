const Profile = require("../DataBase/UserData");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Strategy = new LocalStrategy(
  async function (username, password, done) {
    try {
      const user = await Profile.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Invalid username' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    } catch (error) {
      return done(error);
    }
  }
);

passport.use(Strategy);
module.exports = passport;
