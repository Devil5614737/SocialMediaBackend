const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");
const User = require("../models/user");

router.post("/", auth, async (req, res) => {
  const { title, photo } = req.body;
  const newPost = new Post({
    title,
    photo,
    postedBy: req.user,
  });
  try {
    const post = await newPost.save();
    res.status(200).json("user posted something");
    console.log(post);
  } catch (e) {
    console.log(e);
  }
});



router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy")
 
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})


router.get('/mypost',auth,(req,res)=>{
  Post.find({postedBy:req.user._id})
  .populate("postedBy","_id username")
  .then(mypost=>{
      res.json({mypost})
  })
  .catch(err=>{
      console.log(err)
  })
})

router.put('/updatepic',auth,(req,res)=>{
  User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
      (err,result)=>{
       if(err){
           return res.status(422).json({error:"pic cannot post"})
       }
       res.json(result)
  })
})
router.put('/updatecover',auth,(req,res)=>{
  User.findByIdAndUpdate(req.user._id,{$set:{cover:req.body.cover}},{new:true},
      (err,result)=>{
       if(err){
           return res.status(422).json({error:"pic cannot post"})
       }
       res.json(result)
  })
})

router.delete('/removepost',auth,(req,res)=>{
  Post.findByIdAndDelete(req.body.postId,{
      new:true
  })
  .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
})
router.put('/like',auth,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
      $push:{likes:req.user._id}
  },{
      new:true
  }).exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
});




router.put('/comment',auth,(req,res)=>{
  const comment = {
      text:req.body.text,
      postedBy:req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId,{
      $push:{comments:comment}
  },{
      new:true
  })
  .populate("comments.postedBy","_id username")
  .populate("postedBy","_id username")
  .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
})

module.exports = router;
