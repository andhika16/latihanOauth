const FacebookStrategy = require('passport-facebook').Strategy;
const UserFacebook = require('../model/facebook-user');


module.exports = function(passport) {
    passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID_FB,
        clientSecret:process.env.CLIENT_SECRET_FB,
        callbackURL: "http://localhost:3000/auth/facebook/redirect",
        profileFields: ['id', 'first_name', 'last_name']
    }, async (accessToken, refreshToken, profile, done) => {
       console.log(profile.id);
        const newUser = {
            facebookId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        }
        try {
            // console.log(newUser);
            let user = await UserFacebook.findOne({facebookId:profile.id})
            // console.log(profile.id);

            if(user){
                // console.log(user);
                return done(null,user)
            } else {
                user = await UserFacebook.create(newUser)
                return done(null,user)
            }

        } catch (error) {
            console.log(error);
        }
    
    }))
    passport.serializeUser((user, done)=>{
        done(null,user.id)
    })
    passport.deserializeUser((id, done) => UserFacebook.findById(id,(err, user) => done(err,user)))
}

