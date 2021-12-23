const dotenv=require('dotenv')
const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
const signup=require('./routes/signup')
const login=require('./routes/login');
const post=require('./routes/post');
const users=require('./routes/users');



dotenv.config({path:'./.env'})
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log('connected to mongodb')).catch(e=>console.log(e))


app.use('/signup',signup);
app.use('/login',login);
app.use('/post',post);
app.use('/users',users);


const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})


