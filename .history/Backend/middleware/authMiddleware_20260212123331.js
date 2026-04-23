const jwt = require("jsonwebtoken");

function protect(req , res , next) {
    try{
        const authHeader = req.header.authorization;

        if(!authHeader || !authHeader.startWith("Bearer")) {
            return res.status(401).json({message: "Not authorized,no token"});

        }
        const token = authHeader.split(" ")[]
    }
}