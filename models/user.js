const mongoose=require('mongoose');



const userSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:55
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:1200
    },
    pic:{
        type:String,
        default:'https://images.unsplash.com/photo-1639689413104-82dbbd1db74d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    cover:{
        type:String,
        default:'https://images.unsplash.com/photo-1617654112368-307921291f42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=413&q=80'
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    }]
})



userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
    return token
}



const User=mongoose.model('User',userSchema);
module.exports=User;