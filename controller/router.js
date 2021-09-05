const express = require('express')
const passport = require('passport')
const router = new express.Router()
const Resources = require('../models/ResourcesSchema')
require('./auth')(passport)

const checkauth = (req,res,next)=>{
   if(!req.user){
     //if not logged in
     res.redirect('/login')
   }
   else{
     next()
   }
}

router.get('/',(req,res)=>{
    res.render('index')
})

 router.get('/add',(req,res)=>{
    res.render('add')
})

 router.get('/resources',(req,res)=>{

   Resources.find({}).then((resourcedata)=>{
      res.render('resources',{resourcedata:resourcedata})
})

 })
 router.get('/login',(req,res)=>{
    res.render('login')
 })

 //post requests
 router.post('/resources',checkauth,(req,res)=>{
     const {name,title,resources,category} = req.body;
     Resources.findOne({resources:resources},(err,available)=>{
        if(err) throw err;
        if(available){
           res.render('index')
        }
        else{
         Resources.insertMany({
            name:name,
            resources:resources,
            title: title,
            category:category
         })
         res.redirect('/add') 
        }
     }) 
 })
 router.post('/downvote',checkauth,async(req,res)=>{
   var {downvotelink} = await req.body;
   var reportedresources = await Resources.findOne({resources:downvotelink})
   reportedresources.downvotecount += 1
   await reportedresources.save()
   res.redirect('/resources')
 })

//authentication routing
router.get('/google',
passport.authenticate('google',{scope:['profile','email']})
)
router.get('/google/callback',
passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
  res.redirect('/resources')
})

router.use(Resources)
module.exports = router;