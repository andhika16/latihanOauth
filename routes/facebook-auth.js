const router = require('express').Router();
// setup github user and access token
const { githubUser,getAccessToken } = require('../config/passport-facebook');

const client_id = process.env.CLIENT_ID_GIT;
const client_secret = process.env.CLIENT_SECRET_GIT;



router.get('/login/github', (req, res) => {
  
  const redirect_uri = 'http://localhost:3000/auth/github/redirect'
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      client_id
    }&redirect_uri=${redirect_uri}`
  )
})

router.get('/github/redirect/',async (req, res, next) => {
    const code = req.query.code
    if(!code){
      res.send('No code')
    }
  
    const token = await getAccessToken({code,client_id,client_secret})
    const user =  await githubUser(token)
    if(user){
      req.session.access_token = token
      req.session.githubId = user.id

      res.redirect('/github_user')

    } else {
      res.redirect('/login')
    }
  
})
  



module.exports = router


