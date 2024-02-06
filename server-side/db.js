const { MongoClient } = require('mongodb')
require('dotenv').config()

let dbConnection

module.exports = {
    connection:(cb)=>{
        MongoClient.connect(process.env.DATABASE_URL)
        .then((client)=>{dbConnection = client.db() 
            return cb()}).catch(err =>{console.error(err) 
            return cb(err) ;})
    },
    getdb : ()=>dbConnection
}