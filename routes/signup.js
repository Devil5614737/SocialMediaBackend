const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt')



router.post('/',async(req,res)=>{
    const {username,email,password}=req.body;
    const newUser=new User({
        username,email,password
    })

    const existedUser=await User.findOne({email})
    if(existedUser){
        return  res.status(401).send('user already registered..')
    }
    else{
        const salt=await bcrypt.genSalt(12)
        newUser.password=await bcrypt.hash(newUser.password,salt)
        const user=await newUser.save()
        res.status(200).json('user registered')
        console.log(user)
    }

})





module.exports=router;
