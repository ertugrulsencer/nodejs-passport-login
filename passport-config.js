const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");
const passportInitialize = async (passport, getUserByEmail, getUserById) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "User not found" });
    } else {
      try {
        if (await bcrypt.compare(password, user.passport)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } catch (e) {
        return done(`ERROR: ${e}`);
      }
    }
  };
  passport.use(new Strategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
};
module.exports = passportInitialize;
