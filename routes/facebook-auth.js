const router = require('express').Router();
const passport = require('passport');


router.get('/facebook',(passport.authenticate('facebook', { scope: ['email','user_friends']})))

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
// *  alhamdulliah sudah bisa render profile user walaupun sedikit
  res.redirect('/profile')
})

module.exports = router
