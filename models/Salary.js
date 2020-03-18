const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


const Salary =mongoose.model('Salary',UserSchema);

module.exports=Salary;