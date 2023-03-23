const mongoose = require('mongoose');
// get validator package for email validation
const { isEmail } = require('validator');

//Hashing password
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : [true, 'Please enter a Email Id'],
        unique : true,
        lowercase : true,
        validate : [isEmail, 'Email is incorrect']
    },
    password :{
        type : String,
        required : [true, 'Please enter a Password'],
        minLength : [6, 'Minimum Password length 6 is required']
    },
    verified : {
        type : Boolean,
        default : false,
        validate : {
            validator : () => Promise.resolve('false'),
            message : 'Please Verify Your Account'
        }
    }
}, { timestamps: true });


//Function fires before the save doc
userSchema.pre('save', async function (next) {
    console.log('It is fired before saving');
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password){
    const user = await this.findOne({ email });
    if(user){
        if(user.verified === false)
        throw Error('Account not Verified');
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Password is Incorrect');
    }
    throw Error('Email Id is Not Found');
}


const User = mongoose.model('user',userSchema);

module.exports = User;