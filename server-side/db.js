const { MongoClient } = require('mongodb')


let dbConnection



module.exports = {
    connection:(cb)=>{
        MongoClient.connect('mongodb://localhost:27017/PFE')
        .then((client)=>{dbConnection = client.db() 
            return cb()}).catch(err =>{console.error(err) 
            return cb(err) ;})
    },
    getdb : ()=>dbConnection
}