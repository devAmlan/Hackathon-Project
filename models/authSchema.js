var Mongoose = require('mongoose')
const authSchema = Mongoose.Schema({
    username:{
        require:true,
        type:String
    },
    email:{
        require:true,
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    googleId:{
        require:true,
        type:String 
    }
})
const googleAuth = Mongoose.model('googleauth',authSchema)
module.exports = googleAuth;