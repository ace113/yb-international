const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})


authSchema.pre('save', async function(next){
    try {        
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        //   Gendrate a password hash(salt + hash )
        const passwordHash = await bcrypt.hash(this.password, salt)
        //  Re-assign hashed version over original, plain text password
        this.password = passwordHash;

        next();
    } catch (error) {
        next(error);
    }
})

const Admin = mongoose.model('Admin', authSchema)

module.exports = Admin;