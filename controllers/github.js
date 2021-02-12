// setup github user and access token
const {
  githubUser,
  getAccessToken
} = require('../middlewares/githubAuth');
const {
  createToken
} = require('../middlewares/auth');
const User = require('../model/github');
const client_id = process.env.CLIENT_ID_GIT;
const client_secret = process.env.CLIENT_SECRET_GIT;


const url_uri = (req, res) => {

  const redirect_uri = 'http://localhost:3000/auth/github/redirect'
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      client_id
    }&redirect_uri=${redirect_uri}`
  )
}

const callbackURL = async (req, res, next) => {
  const code = req.query.code
  if (!code) {
    res.send('No code')
  }
  const token = await getAccessToken({
    code,
    client_id,
    client_secret
  })
  const user = await githubUser(token)

  try {
    const maxAge = 3 * 24 * 60 * 60;
    const sendUser = {
      githubId: user.id,
      displayName: user.name,
      firstName: user.login,
      image: user.avatar_url
    }
    const new_user = await createToken(sendUser)
    if (new_user) {
      res.cookie('jwt', new_user, { httpOnly: true, maxAge: maxAge * 1000 })
      res.redirect('/profile')
    } else {
      console.log('error');
    }

  } catch (error) {
    console.log(error);
  }


}


const loadGithubUser = async (req, res) => {
  const user = await User.findOne({
    // bagaimana cara agar session tidak tambah didatabase dan access_token tetap
    githubId: req.session.githubId
  })

  // store data user pada session lalu render di profil dengan panggil session

  // user github ambil data dari database untuk user google ambil data req.user 
  // kondisi dibawah sebagai pemisah antara user github dan google


}

module.exports = {
  url_uri,
  callbackURL,
  loadGithubUser
}