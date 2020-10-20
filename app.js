const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000;
const path = require('path');
const passport = require('passport');
const connectDB = require('./config/db');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session),ejs = require('ejs');
// load db
connectDB()
// load passport
require('./config/passport')(passport);
// session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))
// passport initialize
app.use(passport.initialize())
app.use(passport.session())
// body parser
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
// load view handlebars
app.set('view engine', 'ejs' )
app.engine('.hbs', exphbs({ 
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// route
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/google-auth'))

// port
app.listen(PORT, (req, res) => {
    console.log(`server running on ${PORT}`);
})
