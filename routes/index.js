const router = require('express').Router();


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
router.get('/profile' , (req, res) => {
    
        if(req.session.githubId) {
            res.render('profile',{
                displayName:req.session.displayName,
                firstName:req.session.firstName,
                image:req.session.image
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