const router = require('express').Router();
const passport = require('passport');

// redirect to google login
router.get('/google',passport.authenticate('google', {
    scope:['profile']
}))


// redirect to google or auth di first profile
router.get('/google/redirect',passport.authenticate('google'), (req, res) => {
    res.redirect('/profile')
})


// auth logout
router.get('/logout', (req, res) => {
    // handle with google
    req.logOut();
    res.redirect('/')

})


module.exports =  router