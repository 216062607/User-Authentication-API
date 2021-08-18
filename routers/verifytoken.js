const jwt = require('jsonwebtoken');

//midleware
module.exports= function (req,res,next){
    const token = req.header('auth-token');
    if (!token) return res.status(401). send('invalid');

    try{
        const varified =jwt.verify(token,process.env.TOKEN_SECRET);
        req.user= varified;
        next();

    }catch(errr){
        res.status(400).send('invalid token ')

    }

}