const router = require('express').Router();
// setup github user and access token
const { githubUser,getAccessToken } = require('../config/passport-facebook');
const User = require('../model/facebook-user');
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
    try {
      // identifikasi id dari user yang login apakah sudah ada data di database
        newUser = await User.findOne({
          githubId:user.id
        })
        req.session.githubId = user.id
        // cara agar session tidak bertambah pada database
      if(newUser){
        res.redirect('/profile')
        } else {
          // jika tidak ada maka buat baru dan store didatabase
          const new_user = {
            githubId:user.id,
            displayName: user.name,
            firstName:user.login,
            image:user.avatar_url
          }
          newUser = await User.create(new_user)
          // dan buat session berdasarkan user baru yang login
          req.session.access_token = token
          req.session.githubId = user.id
          res.redirect('/profile')
        }


    } catch (error) {
      console.log(error);
    }
    
  
})

router.get('/logout',(req, res)=> {
  if(req.session) req.session.destroy()
  res.redirect('/login')
})
  



module.exports = router


