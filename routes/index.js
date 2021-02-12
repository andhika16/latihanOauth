const router = require('express').Router();
const {
    checkUser,
    requireAuth
} = require('../middlewares/auth');


// login page
router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// * check all routes about user login
router.get('*', checkUser)

// dashboard page
router.get('/', (req, res) => {
    res.render('dashboard')
})

// about page
router.get('/about', (req, res) => {
    res.render('about')
})

// about page
router.get('/profile',(req, res) => {


    // res.json({
    //     status: 'oke',
    //     message: 'mantap gan'
    // })

    // const token = req.cookies.jwt

    // console.log(token);
    if (req.session.githubId) {
    //  * sebagai gantinya render user dimasukkan ke session
        res.render('profile', {
            displayName: req.session.displayName,
            firstName: req.session.firstName,
            image: req.session.image
        })

    } else {
        res.render('profile', {
            //! terjadi error pada saat login user github pada render req.user

            displayName: req.user.displayName,
            firstName: req.user.firstName,
            image: req.user.image
        })
    }



})

module.exports = router;