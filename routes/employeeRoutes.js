const { Router } = require('express');
const employeeCont = require('../controller/employeeController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

// Employee Create Page Show
router.get('/create-employee',requireAuth,employeeCont.emp_show);

// Employee Create
router.post('/create-employee',employeeCont.emp_create);

//Getting All Employee List
router.get('/employeeList', employeeCont.get_all_emp);

//Get Single Employee detail
router.get('/employee/:id',employeeCont.get_single_emp);

module.exports = router;