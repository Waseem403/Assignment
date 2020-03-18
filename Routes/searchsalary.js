const express=require('express');
const router=express.Router();

const Salary=require("../models/Salary")

router.get("/search",(req,res)=>{
    res.render("searchsalary")
})

router.post("/searchdetails",(req,res)=>{

     const {salarydetails,opt}=req.body
     let salarydetails_int=parseInt(salarydetails)
      
     if(opt==="$gt")
     {
      Salary.find({ salary: { $gt: salarydetails_int } }).then(getsalaries=>{
        res.render('searchsalary',{getsalaries})
    })
     }
     else
     {
      Salary.find({ salary: { $lt: salarydetails_int } }).then(getsalaries=>{
        res.render('searchsalary',{getsalaries})
    })
     }
  
})

module.exports = router;
