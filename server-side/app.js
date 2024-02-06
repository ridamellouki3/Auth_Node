const express = require('express')
require("dotenv").config()
const {connection, getdb} = require('./db')
const cors = require('cors')
const clientRoute = require('./router/client')

let app = express()


connection((err)=>{
    if(!err){
        app.listen(process.env.PORT);
        console.log('server starting at', process.env.PORT)
    }else{
        console.log(err);
    }
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(clientRoute)