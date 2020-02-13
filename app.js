const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')


// env config
dotenv.config();


// connect mongodb
const URL = 'mongodb://localhost:27017/herbshop';
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database is ready'))
    .catch(err => console.log(err))


const app = express()


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
app.use('/admin', require('./routes/backend/index'))

app.use('/admin', require('./routes/backend/admin.route'))


// non existing routes
app.get('*', (req, res) => {
    res.status(404).send(`errors 404 -- This page doesn't exists!`)
})

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on ${port}`))