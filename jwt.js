const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

    //first check if the token is present in the request headers authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({ message: "Token not found" });
    }

    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try{
        // veryfy the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user information to the request object
        req.user = decoded; // user ta onno name o dite partawm
        next();

    }
    catch(err){
        console.log(err);
        res.status(401).json({ message: "Unauthorized" });
    }
}

// Function generate JWT token
const generateToken = (userData) => {
    // generate jwt token using user data
    return jwt.sign( userData , process.env.JWT_SECRET, { expiresIn: "1d" });
}

module.exports = {
    jwtAuthMiddleware,
    generateToken
}
   