const mongoose = require('mongoose');

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
    }
});

// create Person model

const Person = mongoose.model('Person', personSchema);
module.exports = Person;