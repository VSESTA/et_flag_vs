const jwt = require('jsonwebtoken');

//criar um middleware para obter a authorization
const authorization = (req, res, next) =>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(403).json({
            success: false,
            error: "Forbidden"
        })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = data.user_id;
        req.userName = data.name;
        req.isAdmin = data.isAdmin;
        return next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            error: "Forbidden"
        })
    }
}

module.exports = authorization;