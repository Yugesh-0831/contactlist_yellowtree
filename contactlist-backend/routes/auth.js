const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


//register
router.post("/register", async (req,res)=>{

    const hashedPassword = await bcrypt.hash(req.body.password,12)
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        console.log(err.message);
    }
});

//login

router.post("/login", async (req,res)=>{
    try{
    const user = await User.findOne({username:req.body.username});
    !user && res.status(404).json("user not found")

    const password = await bcrypt.compare(req.body.password,user.password);
    !password && res.status(400).json("wrong password")

    const payload = {_id: user._id};

    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        // expiresIn : "1h",
    });

    return res.status(200).json({token, user});
    // res.json(user)
    }
    catch(err){
        console.log(err.message);
    }
})

//me

router.get("/me",auth,async(req,res)=>{
    return res.status(200).json({...req.user._doc})
})

module.exports = router;