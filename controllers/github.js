// setup github user and access token
const { githubUser,getAccessToken } = require('../middlewares/githubAuth');
const User = require('../model/github');
const client_id = process.env.CLIENT_ID_GIT;
const client_secret = process.env.CLIENT_SECRET_GIT;


const url_uri = (req, res) =>  {
    
const redirect_uri = 'http://localhost:3000/auth/github/redirect'
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      client_id
    }&redirect_uri=${redirect_uri}`
  )
}

const callbackURL = async (req, res,next) => {
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
        req.session.displayName = user.name
        req.session.firstName = user.login
        req.session.image = user.avatar_url
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
    
  
}


const loadGithubUser = async (req, res) => {
  const user = await User.findOne({
    // bagaimana cara agar session tidak tambah didatabase dan access_token tetap
            githubId:req.session.githubId
        })
  
  // store data user pada session lalu render di profil dengan panggil session

    // user github ambil data dari database untuk user google ambil data req.user 
    // kondisi dibawah sebagai pemisah antara user github dan google
    
           
}

module.exports = {url_uri, callbackURL,loadGithubUser}