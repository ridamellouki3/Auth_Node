const express = require('express')
require("dotenv").config()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


const Home = async (req,res)=>{
    const page = req.query.p || 0
    const Userperpage = 2

    let users = await User.find().skip(page * Userperpage).limit(Userperpage);
    console.log(users)
    return res.status(200).json({Users: users}) }


const registre = async (req,res)=>{
    try {
        let hashedpass = await bcrypt.hash(req.body.password, 10)
       await User.create({
            name:req.body.name,
            email:req.body.email,
            password :hashedpass
        })
        res.status(200).json({status:'ok'})
    } catch (error) {
        res.status(400).json({status:'error',err:"something went wrong"})
        console.log(error)
    }
}

const login = async (req,res)=>{
    if (!req.body.password || !req.body.email) {
        return res.status(400).json({status:'error', error: 'Missing fields' });
    }
   let user = await User.findOne({email:req.body.email})
  
   if(user && await bcrypt.compare(req.body.password , user.password)){
    const tokent = jwt.sign({
        email:user.email,
        id: user._id
    },'secret1234567890')
    res.status(200).json({status:'ok',token: tokent})
   }
   else{
    res.status(400).json({status:'error',error:'User Not found or You are ariting a wrong Email'}) 
   }
}

module.exports = {  Home , registre ,login}
