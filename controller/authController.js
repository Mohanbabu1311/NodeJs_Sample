const User = require('../models/user_model')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { _ } = require('lodash');


const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'qa@zenitus.com',
		pass: 'dtpucibvyjeevwol'
	}
});


const email_sender = (email,user_id)=>{

    const token = jwt.sign(
        { user_id },
        'ourSecretKey',
        { expiresIn : '1d'}
    );

    const mailConfigurations = {

        // It should be a string of sender/server email
        from: 'qa@zenitus.com',
    
        to: `${email}`,
    
        // Subject of Email
        subject: 'Email Verification',
        
        // This would be the text of email body
        text: `Please Click the below link to Verify Account 
            http://localhost:3000/verify/${token}
            Thanks from Zenitus Technologies`
        
    };
    
    const email_gen = transporter.sendMail(mailConfigurations, function(error, info){
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
    }) 
}

const maxAge = 3 * 24 * 60 * 60;
const createtoken = (id) =>{
    return jwt.sign({ id }, 'zenitus secret sign',{
        expiresIn: maxAge
    })
}

//function for handling errors
const handleErrors = (err) =>{
    //console.log(err.message, err.code);
    let errors = { email: '', password: '', verified : ''};
    //console.log(err);
    //duplicate keys
    if(err.code === 11000){
        errors.email = 'This email is already registered';
        return errors;
    }
    //validation error
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            console.log(errors[properties]);
            errors[properties.path] = properties.message;
        });
    }
    //
    console.log(err);
    if(err.message === 'Email Id is Not Found'){
        errors.email = 'Email Id is Not Registered';
    }
    if(err.message === 'Password is Incorrect'){
        errors.password = 'Password is Not Correct';
    }
    if(err.message === 'Account not Verified'){
        errors.verified = 'Please Verify Your Acoount';
    }
    return errors;
}

//Sign Up Page
module.exports.signup_get = (req, res) => {
    res.render('signup');
};

//Sign Up Post
module.exports.signup_post = async (req, res) => {
    //console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = await User.create({email,password});
        const token = createtoken(user._id);
        res.cookie('jwt',token, { httpOnly: true,maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
        email_sender(email,user._id);
    } catch (error) {
        const errors = handleErrors(error);
        //console.log(error);
        res.status(400).json({ errors });
    }
};

//Login Page
module.exports.login_get = (req, res) => {
    res.render('login');
};


//Login Post
module.exports.login_post = async (req, res) => {
    const { email, password, verified} = req.body;
    //console.log('Verification is ',req.body);
    try{
        const user = await User.login(email, password);
        console.log('Body',user);
        const token = createtoken(user._id);
        res.cookie('jwt',token, { httpOnly: true,maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout_page = (req, res) => {
    res.cookie('jwt', ' ', { maxAge: 1});
    res.redirect('/login');
};

