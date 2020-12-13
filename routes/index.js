const router = require('express').Router();
const {ensureAuth,ensureGuest} = require('../config/auth');
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

// github page
router.get('/github_user', async (req, res) => {
    const user = await User.findOne({
        // bagaimana cara agar session tidak tambah didatabase dan access_token tetap
        githubId:req.session.githubId
    })
    if(user){
        res.render('github_user',{
            // untuk sementara load secara manual pada json data
            displayName:user.displayName,
            firstName:user.firstName,
            image:user.image
        })
    } else {
        res.send('session expired')
    }
})


// about page
router.get('/profile', (req, res) => {
    res.render('profile',{
        displayName:req.user.displayName,
        firstName:req.user.firstName,
        image:req.user.image
    })
})


module.exports = router;