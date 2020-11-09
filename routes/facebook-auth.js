const router = require('express').Router();
const passport = require('passport');


router.get('/facebook',(passport.authenticate('facebook', { scope: ['email','user_friends']})))

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/profile')
})
// router.get('/facebook/redirect', passport.authenticate('facebook'))

// router.get('/facebook',
//   passport.authenticate('facebook'));

// router.get('/facebook/redirect',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   (req, res) =>{
//     // Successful authentication, redirect home.
//     res.redirect('/profile');
//   });

module.exports = router
