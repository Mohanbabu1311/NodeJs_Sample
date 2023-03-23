const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = Schema({
    firstname : {
        type : String,
        required : [true, 'Please enter a first name'],
    },
    midname : {
        type : String,
    },
    lastname : {
        type : String,
        required : [true, 'Please enter a last name'],
    },
    add1 : {
        type : String,
        required : [true, 'Please enter address'],
    },
    add2 : {
        type : String,
        required : [true, 'Please enter a address'],
        lowercase : true,
    },
    city : {
        type : String,
        required : [true, 'Please enter City'],
    },
    pincode : {
        type : String,
        required : [true, 'Please enter Pincode'],
    },
    pre_company : {
        type : String,
        required : [true, 'Please enter Previous Company'],
    },
    blood_grp : {
        type : String,
        required : [true, 'Please enter your blood group'],
    },
    mobile : {
        type : String,
        required : [true, 'Please enter your Mobile Number'],
    },
    role : {
        type : String,
        required : [true, 'Please enter your Role'],
    },

}, { timestamps: true });

const Employee = mongoose.model('Employee_det', empSchema);

module.exports = Employee;

