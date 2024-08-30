import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please provide a valid email address'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,  
    hashed_password: {
        type: String,
        required: "Password is required"
    },  
    salt: String
});

userSchema
    .virtual('password')
    .set(function(password){
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword()
    })
    .get(function(){
        return this._password
    })