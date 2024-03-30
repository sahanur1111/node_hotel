const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// define the person Schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    age: {
        type: Number
        
    },
    work: {
        type: String,
        enum:["chef", "waiter", "manager"],
        required:true
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    address: {
        type: String,
        required:true
    },
    salary: {
        type:Number
    },
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
});

// hash the password
personSchema.pre('save', async function (next) {
    const person = this;

    // Hash the password only if the password field has been modified
    if (!person.isModified('password')) return next();
   try{
    // hashpassword generated
    const salt = await bcrypt.genSalt(10);
    // /hash password
    const hashPassword = await bcrypt.hash(person.password, salt);
    // store hash password
    person.password = hashPassword;
    next();
   }catch(err){
    return next(err);
   }
});

// compare password
personSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch =  await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};
// create Person model

const Person = mongoose.model('Person', personSchema);
module.exports = Person;