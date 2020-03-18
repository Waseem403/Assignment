const express=require('express');
const router=express.Router();


//getting scheme
const Salary=require("../models/Salary")

router.get("/",(req,res)=>{
    res.render("addsalary")
})


router.post("/addsalary",(req,res)=>{
    const { name, email, salary } = req.body;
    let errors = [];
  
    if (!name || !email || !salary) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (isNaN(salary)) {
      errors.push({ msg: 'Salary must be in number' });
    }
  
  
    if (errors.length > 0) {
      res.render('addsalary', {
        errors,
        name,
        email,
        salary,      
      });
    } else {
        let success=[]
        
        const newSalary = new Salary({
            name,
            email,
            salary
          });

          newSalary.save(salary=>{
            success.push({msg:"successfully added your details"})
            res.render("addsalary",{success})
          })
      
       
    }



})


module.exports = router;
