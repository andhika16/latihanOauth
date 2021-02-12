const jwt = require('jsonwebtoken');

function checkUser(req, res, next) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'andhika',async(err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                const {displayName, firstName, image } = decodedToken
                res.render('profile', {
                    displayName, firstName, image
                })
            }

        })
    } else {
        res.redirect('/login')
    }


}

const requireAuth = (req,res,next) => {
    // grab token from cookies
    const token = req.cookies.jwt

    if(token){
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
        if(err) {
            // console.log(err.message);
            res.redirect('/login')
        } else {
            // console.log(decodedToken);
            next()
        }
    })
    } else {
        res.redirect('/login')
    }
}
const maxAge = 3 * 24 * 60 * 60;
// function createToken(id) {
//     const token = jwt.sign({
//         id
//     }, 'andhika', {
//         expiresIn: maxAge
//     })
//     return token
// }



// const someToken = {
//     maxAge: maxAge,
//     createToken: function (id,next) {
//         const token = jwt.sign({
//             id
//         }, 'andhika', {
//             expiresIn: maxAge
//         })
//         next()
//         return token
//     },
//     sendToken: (req, res, next) => {
//         const token = someToken.createToken()
//         return res.cookie('jwt', token, {
//             maxAge: maxAge
//         })
//     }


// }


// function createTokenAndSend(req, res, next) {
//     const token = (id) => {
//         return jwt.sign({id}, 'andhika', {expiresIn:maxAge})
//     }
//     return res.cookie('jwt', token, {maxAge:emaxAge})
// }
function createToken(data) {
    const token = jwt.sign(
        data
    , 'andhika', {
        expiresIn: maxAge
    })
    return token

}





// (async (req, res, next) => {
//     const token = createToken.token
//     return await res.cookie('jwt', token, {
//         maxAge: maxAge
//     })
// })






















// console.log(someToken.createToken());


// const sendToken = (req, res, next) => {
//     const token = someToken.createToken()
//     return res.cookie('jwt', token, {
//         maxAge: maxAge
//     })
// }



module.exports = {
    createToken,
    checkUser,
    requireAuth
}