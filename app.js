const express = require('express');
const { result } = require('lodash');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');
const employeeRoutes = require('./routes/employeeRoutes');
const User = require('./models/user_model');
const { render } = require('ejs');
const jwt = require('jsonwebtoken');
const CronJob = require("node-cron");
const fs = require('fs');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://mohan_1:Mohanbabu13@zenitus_tech.2nkzot8.mongodb.net/zenitus_tech?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => {console.log('Connected To DB');
app.listen(3000);
scheduledJobFunction.start();
})
.catch((err) => console.log(err));



app.get('/',requireAuth,(req, res) => {
    res.render('home');
    console.log('Server has been started');
});


app.get('/set-cookies',(req, res) => {
    res.cookie('user','mohan');
    res.send('you got cookies');
});

app.get('/get-cookies',(req, res) => {
    const cookies = req.cookies;
    console.log(cookies.user);
    res.json(cookies);
});

app.get('/verify/:token', (req, res)=>{
    const {token} = req.params;
    console.log('Hey Buddy app verify');
    // Verifying the JWT token 
    jwt.verify(token, 'ourSecretKey', function(err, decoded) {
        if (err) {
            console.log(err);
            res.send("Email verification failed, possibly the link is invalid or expired");
        }
        else {
            console.log('Token in link');
            console.log(decoded);
            User.findByIdAndUpdate({'_id' : decoded.user_id}, { $set: { verified: true }})
            .then(result=>{
                console.log(result);
                res.redirect('/login');
                
            })
            .catch(err => {
                console.log(err);
            })
        }
    });
});

//login and SignUp routes
app.use(authRoutes);

//employee input page
app.use(employeeRoutes);

//Job for Collecting Users Login
const scheduledJobFunction = CronJob.schedule(" 1 * * * * *", () => {
    const user = User.find()
    .then((result)=>{
        console.log(result);
        const message = fs.createWriteStream(__dirname + "/files/Employee.txt");
        result.forEach(element => {
            message.write('Email :' + element.email + ' Verified :' + element.verified + "\r\n") ;
            // fs.writeFileSync('./files/Employee.txt',JSON.stringify(element.email));
            console.log(element.email);
        })  
        return result;
    })
    .catch((err)=>{
        console.log(err);
    })
    console.log("I'm executed on a schedule!");
    message.close();
    
});

