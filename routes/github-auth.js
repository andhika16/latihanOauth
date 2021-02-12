const router = require('express').Router();
const {
  callbackURL,
  url_uri,
  loadGithubUser
} = require('../controllers/github');



router.get('/login/github', url_uri)

router.get('/github/redirect/', callbackURL)
router.get('/profile', loadGithubUser)
router.get('/logout', (req, res) => {
  res.cookie('jwt', '', {maxAge:-1});
  res.redirect('/')
})




module.exports = router