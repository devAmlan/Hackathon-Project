var Mongoose = require('mongoose')
const ResourcesSchema =  Mongoose.Schema({
 name:{
    required:true,
    type:String
    },
 resources:{
    required:true,
    type:String
    },
 title:{
    require:true,
    type:String
},
 category:{
    required:true,
    type:String
},
downvotecount:{
   default:0,
   type:Number
}

})
const Resources = Mongoose.model('resources',ResourcesSchema)
module.exports = Resources;