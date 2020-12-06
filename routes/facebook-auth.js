const router = require('express').Router();
const fetch = require('node-fetch');
// router.get('/login/oauth/authorize', passport.authenticate('facebook'));

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



 async function githubUser(access_token) {
  const req =  await fetch('https://api.github.com/user', {
     headers : {
       Authorization : `bearer ${access_token}`
     }
   })

   const data = await req.json()
   return data;
 }


async function getAccessToken(code) {
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  })
  const text = await res.text()
  const params = new URLSearchParams(text);
  return params.get("access_token");
  }

 
  router.get('/github/redirect/',async (req, res, next) => {
    const code = req.query.code
    if(!code){
      res.send('No code')
    }
  
    const token = await getAccessToken(code)
    const githubData =  await githubUser(token)
    res.json(githubData)
  
  })
  



module.exports = router


