const router = require('express').Router();
const {ensureAuth,ensureGuest} = require('../config/auth');
const User = require('../model/user');

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
router.get('/github_user', (req, res) => {
    res.render('github_user')
})


// about page
router.get('/profile', (req, res) => {
    // render view from user data
//     const user = {
//         displayName:req.user.displayName,
//         firstName:req.user.firstName,
//         lastName:req.user.lastName,
//         image:req.user.image
//     }
//    if(!user)
       res.render('profile')
//    } else {
//        res.render('profile', {user})
//    }
})


module.exports = router;