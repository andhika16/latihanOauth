const router = require('express').Router();
const User = require('../model/facebook-user');


// login page
router.get('/login', (req, res) => {
    res.render('login', {layout:'login'})
})

// dashboard page
router.get('/',  (req, res) => {
    res.render('dashboard')
})

// about page
router.get('/about', (req, res) => {
    res.render('about')
})

// about page
router.get('/profile' ,async (req, res) => {
    
    const user = await User.findOne({
// bagaimana cara agar session tidak tambah didatabase dan access_token tetap
        githubId:req.session.githubId
    })
// user github ambil data dari database untuk user google ambil data req.user 
// kondisi dibawah sebagai pemisah antara user github dan google
    if(user) {
        res.render('profile', {
            displayName:user.displayName,
            firstName:user.firstName,
            image:user.image
        })
    } else {
        res.render('profile',{
            // terjadi error pada saat login user github pada render req.user
            displayName:req.user.displayName,
            firstName:req.user.firstName,
            image:req.user.image
        })
    }

   
})

module.exports = router;