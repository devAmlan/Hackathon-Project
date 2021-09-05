const express = require('express')
const app = express();
const route = require('./controller/router')
var Mongoose = require('mongoose')
const passport = require('passport')
const cookieSession  = require('cookie-session')
require('dotenv').config();
const port = process.env.PORT || 2021;
app.use(cookieSession({
    maxAge:48*60*60*1000,
    keys:['bluelearnhackathon'] //secretkey for cookies
}))
//initialize passport
app.use(passport.initialize())
app.use(passport.session())

// mongodb set up
const db = require('./config/keys').MongoURI;
Mongoose.connect(db,{ useNewUrlParser: true })
.then(console.log('database connected successfully'))
.catch(err=>console.log(err))

//json data parsing
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//view engine and public folder for ejs frontend 
app.set('view engine','ejs')
app.use(express.static('Public'))
app.use(route)
app.listen(port,()=>{
    console.log('listening at port 2021')
})