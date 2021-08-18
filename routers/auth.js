const router = require('express').Router();
const User= require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jws = require('jsonwebtoken')

router.post('/register', async (req,res)=>{
   //validate the data before user
   const {error}= registerValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   
    // user already exist
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exixts');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

   //creat a new user
    const user = new User({
       name:req.body.name,
       email: req.body.email,
       password: req.body.password

   }); 
   try{
       const savedUser =await user.save();
       res.send(savedUser);

   }catch(err){
       res.status(400).send(err);
   }
});

//log in 
router.post('/login', async(req,res)=>{
    //validate the data before user
    const {error}= loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        // user already exist
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Email or password doesnt exit');
        //check if password correct
        const validPass = await bcrypt.compare(req.body.password, user.pasword);
        if (!validPass) return res.status(400).send('Ivalid password');

        //create and assign token
        const token =jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token); 

        res.send('Logged in');


});




module.exports=router