const express=require('express');
const router=express.Router();
const User=require('../models/user');
const auth=require('../middleware/auth')

router.get('/',auth,async(req,res)=>{
    const user=await User.findById(req.user._id).select('-password')
     res.status(200).send(user);
})



router.get('/accounts',auth,async(req,res)=>{

const users=await User.find()
 

   

    res.status(200).json(users)
  
})

router.put('/updatename',auth,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{username:req.body.username}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:'not updated'})
         }
         res.json(result)
    })
  })
  
  router.get("/user", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports=router;
