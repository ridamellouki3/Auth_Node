const express = require('express')
const {connection, getdb} = require('./db')
const cors = require('cors')
const bcrypt = require('bcrypt')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

let app = express()


connection((err)=>{
    if(!err){
        app.listen(1337);
        console.log('server starting at 1337')
    }
})


app.use(cors())
app.use(express.json())


app.post('/api/registre', async (req,res)=>{
    try { 

        let hashedpass = await bcrypt.hash(req.body.password, 10)
       await User.create({
            name:req.body.name,
            email:req.body.email,
            password :hashedpass
        })
        res.status(200).json({status:'ok'})
    } catch (error) {
        res.status(400).json({status:'error',error:'This email is already taken'})
        console.log(error)
    }
})

app.post('/api/login',async (req,res)=>{
    if (!req.body.password || !req.body.email) {
        return res.status(400).json({status:'error', error: 'Missing fields' });
    }
   let user = await User.find({email:req.body.email})
   if(user && await bcrypt.compare(req.body.password , user.password)){
    const tokent = jwt.sign({
        email:user.email,
        id: user._id
    },'secret1234567890')
    res.status(200).json({status:'ok'})
   }else{
    res.status(400).json({status:'error',error:'You enter omething wrong'}) 
   }
})





