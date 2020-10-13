const router = require('express').Router();
const User = require('../model/user');
// login page
router.get('/login', (req, res) => {
    res.render('login', {layout:'login'})
})

// dashboard page
router.get('/', (req, res) => {
    res.render('dashboard')
})

// about page
router.get('/about', (req, res) => {
    res.render('about')
})

// about page
router.get('/profile', (req, res) => {
    res.render('profile', {user:req.user})
})

module.exports = router;