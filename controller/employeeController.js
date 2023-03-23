const { model } = require('mongoose');
const Employee = require('../models/emp_model')

module.exports.emp_show = (req, res)=>{
    res.render('employeeCreate');
}

//Create Employee
module.exports.emp_create = async(req, res)=>{
    const {firstname, midname, lastname, add1, add2, city, pincode, pre_company, blood_grp, mobile, role } = req.body;
    console.log('coming here');
    console.log(firstname);
    try{
        const employee = await Employee.create({firstname, midname, lastname, add1, add2, city, pincode, pre_company, blood_grp, mobile, role});
        res.status(201).json({employee: employee._id});
    }catch (error) {
        //const errors = handleErrors(error);
        console.log(error);
        res.status(400).json({ errors });
    }

}


//Get ALL Employee List

module.exports.get_all_emp = async(req, res) =>{
    Employee.find().sort({ createdAt : -1 })
    .then((result)=>{
        console.log(result.length);
        res.render('employeeList',{employees : result});
    })
    .catch((err)=>{
        console.log(err);
    });
}

//Get Single Employee details

module.exports.get_single_emp = async (req, res) =>{
    const emp_id = req.params.id;
    console.log(emp_id);
    Employee.findById(emp_id)
    .then(result=>{
        console.log(result);
        res.render('emp_details', {emp_detail : result});
        
    })
    .catch(err => {
        console.log(err);
    })
}
