const express=require('express');
const passport=require('passport');
const router=express.Router();//mini instance 
const User=require('../models/User');

//to show the form for signup
router.get('/register',(req,res)=>{
    res.render('auth/signup');
});

//to actually register a user in db
router.post('/register',async(req,res,next)=>{
    try{
        let {email , username , password,role}=req.body;
        const user= new User({email,username,role});
        const newUser= await User.register( user , password )
        //res.redirect('/login');
        req.login(newUser,function(err){
            if(err){return next(err)}
            req.flash('success','welcome, you have registered successfully!');
            res.redirect('/products');
        })
    }
    catch(e){
        req.flash('error',e.message);
        return res.redirect('/signup');
    }
});

//to actually login form
router.get('/login',(req,res,next)=>{
    res.render('auth/login');
});

//to actually login via db
router.post('/login',
    passport.authenticate('local',
        { failureRedirect: '/login' ,
        failuremessage:true
        }),
    (req,res)=>{
        req.flash('success','welcome back!')
        res.redirect('/products');
});

//logout
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout()
    }
    req.flash('success','logged out successfully!')
    res.redirect('/login');
});

module.exports=router;