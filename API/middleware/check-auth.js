const jwt = require('jsonwebtoken');
module.exports = (req, res, next)=>{
    try{
        const token = req.header.authorization.split(' ');
        if(!token){
            throw new Error('Auth fail')
            console.log('Authentication Failed', 401)
            return next(error)
        }
        const decoded = jwt.verify(req.body.token,'supersecret_confidential' );
        req.userData = {userId: decoded.userId};
        next();
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}