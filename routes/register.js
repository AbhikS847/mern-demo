const { json } = require('express');
const express = require('express');

const route = express.Router();

const User = require('../models/User');

const {check,validationResult} = require('express-validator');

route.get('/',(req,res)=>{
    res.send("Welcome to the Registration page");
})

route.get('/dummyuser',async(req,res)=>{

    await User.deleteMany();

    try{
        const dummyUser = new User({
            username:'dummy',
            password:'dummy',
            email:'dummy@gmail.com'
        })
    
        dummyUser.save();

        res.send('Dummy user saved');
        console.log("Dummy user has been saved, check your mongoDB compass");
    }

    catch(err){
        console.error(`Database error: ${err}`);
    }

})

route.post('/',[
    check('username','Username is required').not().isEmpty(),
    check('password','Password must be more than 6 characters').isLength({min:6}),
    check('email','Email is required').isEmail()
],async(req,res)=>{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{
        const newUser = await new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        })
    
        newUser.save();

        res.send('New user saved');
        console.log("New user has been saved, check your mongoDB compass");
    }

    catch(err){
        console.error(`Database error: ${err}`);
    }
})

module.exports = route;