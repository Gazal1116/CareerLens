const jwt = require("jsonwebtoken");

function protect(req , res , next) {
    try{
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Server auth misconfigured" });
        }

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message: "Not authorized,no token"});

        }
        const token = authHeader.split(" ")[1];

        if (!token || token === "null" || token === "undefined") {
            return res.status(401).json({ message: "Not authorized,no token" });
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }
    catch(error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired, please login again" });
        }

        return res.status(401).json({message: "Token failed"});
    }
}
module.exports = protect;