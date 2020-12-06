// const FacebookStrategy = require('passport-facebook').Strategy;
// const UserFacebook = require('../model/facebook-user');
// module.exports = function (passport) {

//   passport.use(new FacebookStrategy({
//     clientID: process.env.CLIENT_ID_GIT,
//     clientSecret: process.env.CLIENT_SECRET_GIT,
//     callbackURL: "http://localhost:3000/auth/github/redirect"
//     // profileFields: ['email','id', 'first_name', 'gender', 'last_name', 'picture']
//   },
//     async function (accessToken, refreshToken, profile, done) {
      
//      console.log(profile);



//     }
//   ));
//   // passport.serializeUser((user, done) => {done(null,user.id)})
//   // passport.deserializeUser( (id, done) => User.findById(id,(err, user) => done(err,user)))
// }