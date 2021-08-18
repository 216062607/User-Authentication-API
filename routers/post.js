const router = require ('express').Router();
const verify = require('./verifytoken');


router.get('/',verify,(req,res)=>{
    res.send(req.user);
    user.findbyOne({_id: req.user})

});

module.exports=router;