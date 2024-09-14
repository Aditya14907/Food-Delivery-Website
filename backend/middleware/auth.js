import jwt from "jsonwebtoken"
//Middleware can check if a request includes valid authentication tokens or credentials. 
//If the authentication fails, it can reject the request before it reaches the protected route.
//next means next callback
const authMiddleWare = async (req,res,next) => {
    //Use header for the users token
    const {token} = req.headers;
    if(!token)
    {
        res.json({success:false,message:"Not Authorized, LogIn Again"})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        //When we created token we passed id .So when we decode we get the users id
        req.body.userId = token_decode.id;
        next();
    }
    catch (error){
        console.log(error);
        res.json({success:false,message:"Unauthorized user"})
    }
}

export default authMiddleWare;