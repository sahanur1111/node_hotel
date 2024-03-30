const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");



// PASSPORT AUTHENTICATION**************VERYFYING USER AND PASS
passport.use(
    new LocalStrategy(async (USERNAME, password, done) => {
      // authentication verification
      try {
        // console.log("Recived credentials", USERNAME, password);
        const user =await Person.findOne({ username: USERNAME });
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const isPasswordMatch =await user.comparePassword(password);
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      } catch (error) {
        return done(error);
      }
    })
  );

  module.exports = passport; //exporting passport