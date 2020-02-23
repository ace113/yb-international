const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
require('./passport')


// env config
dotenv.config();


// connect mongodb
const URL = process.env.DATABASE_URI; // pass your mongodb cloud url to the DATABASE_URI VARIABLE
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database is ready'))
    .catch(err => console.log(err))


const app = express()

// express session
app.use(session({
    secret: 'herbshop-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 } // one hour
}))


// Passport middleware(it is important that you put this after session)
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// set static folder
app.use('/public/', express.static('public'))

// ejs
app.set('view engine', 'ejs')

app.use(expressLayouts)


// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//override with POST having ?_method=PUT,DELETE
app.use(methodOverride('_method'))

// ROUTES
// index route
app.use('/', require('./routes/frontend/index'))

// admin route

app.use('/admin', require('./routes/backend/admin.route'))


// non existing routes
app.get('*', (req, res) => {
    res.render('partials/404', {layout: 'authlayout'})
})


// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on ${port}`))