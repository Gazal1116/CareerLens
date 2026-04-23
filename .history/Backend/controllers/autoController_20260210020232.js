const User = require("../models/User");
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
        if(existingUser) {
            return res.status(400).json({message:"Email already exist"});
        }

         //  Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //  Create user with hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({
        message: "User registered successfully",
        user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
    } 
    catch(error) {
        res.status(500).json
    }
}