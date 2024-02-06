const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL)
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    }},{timestamps:true});
    
let User = mongoose.model("Users",UserSchema);
module.exports  = User 