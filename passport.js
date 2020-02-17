const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const Admin = require('./models/admin.model')


passport.use(new LocalStrategy (
    async(username, password, done) => {
        try {
            // check if admin exists
            const admin = await Admin.findOne({username})
            // if not handle
            if(!admin){
                return done(null, false, {message: 'Username is incorrect'})
            }
            
            const hash = admin.password
            // check if the password match
            const isMatch = await bcrypt.compare(password, hash)
            // if password do not match 

            if(!isMatch){
                return done(null, false, {message: 'Username or Password is incorrect'})
            }

            // if username and password match

          done(null, admin)


        } catch (error) {
            done(null, error)
        }
    }
))

passport.serializeUser(function(admin, done) {
    done(null, admin.id);
})

passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
        done(err, admin);
    })
})