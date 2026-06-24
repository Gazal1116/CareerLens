const User = require("../models/user");
const bcrypt = require("bcryptjs");

const signup = async(req,res)=> {
    try{
        const{name,email,password} = req.body;

        //Validation
        if(!name || !email || !password) {
            return res.status(400).json({message:"All fields are required"});
        }

        //Check existing
        const existingUser = await User.tofindOne({email});
        if(ex)
    }
}