const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleAuth = require('../models/authSchema')
require('dotenv').config();
module.exports = function(passport){
  passport.use(
      new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"https://hackathon-skillapp.herokuapp.com/google/callback" //need to change before deploy into production
      },(accessToken, refreshToken, profile,done)=>{
        googleAuth.findOne({email:profile.emails[0].value}).then((data)=>{
          if(data){
              //user exits already
          return done(null,data)

          }else{
              //create user
              googleAuth({
                  username:profile.name.givenName,
                  email:profile.emails[0].value,
                  isVerified:true,
                  googleId:profile.id 
              }).save(function(err,data){
                  
                  if(err) return err;
                  else{
                      return done(null,data)
                  }
              })
          }
      }) 
      }
      )
  )
  passport.serializeUser((user,done)=>{
      
    done(null,user.id)// will use this userid for session cookie
      
  })
  passport.deserializeUser((id,done)=>{
      googleAuth.findById(id).then((user)=>{
         done(null,user)
      })      
  })
}
