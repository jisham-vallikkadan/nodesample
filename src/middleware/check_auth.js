const jwt=require('jsonwebtoken');


module.exports=(req,res,next)=>{
    try{
        console.log(req.headers.authorization);
        const token=req.headers.authorization.split(" ")[1] ;
        console.log(token)
        const decodedToken=jwt.verify(token,"secret");

        req.userData={username:decodedToken.username,userId:decodedToken.userId,userRoll:decodedToken.userRoll,email:decodedToken.email};
        next();
    }catch(error){
    res.status(400).json({
        message:"Auth failed"
    });
    }
    }
