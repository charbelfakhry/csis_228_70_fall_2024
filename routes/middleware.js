const jwt = require("jsonwebtoken");

// middleware function
const authenticateToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null)
    {
        // 401 unauthorized
        return res.sendSatus(401);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
        if(err){
            // 403 forbidden
            return res.sendSatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;