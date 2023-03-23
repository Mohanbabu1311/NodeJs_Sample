const { Router } = require('express');
const authController = require('../controller/authController');

const router = Router();

router.get('/signup',authController.signup_get);
router.post('/signup',authController.signup_post);
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);
router.get('/logout',authController.logout_page);

module.exports = router;













// Add employee
// app.get('/add-emp',(req, res) => {
//     Employee.create({
//          name : 'Jai Pandian',
//          role : 'developer',
//          salary : '17000',
//          branch : 'india'
//     })
//     .then((result)=>{
//      res.send(result);
//      console.log(result);
//     })
//     .catch((err)=>{
//      console.log(err);
//     })
//  });
 
 
//  //Get All Employee
//  app.get('/get-emp',(req,res)=>{
//      Employee.find()
//      .then((result)=>{
//          res.send(result)
//      .catch((err)=>{
//          console.log(err);
//      })
//      })
//  });
 
//  // Get Single Emp
 
//  app.get('/get-emp/:id',(req,res)=>{
//      const id = req.params.id;
//      Employee.findById(id)
//      .then((result)=>{
//          res.send(result);
//      })
//      .catch((err)=>{
//          console.log(err);
//      })
//  })