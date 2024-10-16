import {TokenDecode} from "../utility/tokenUtility.js";

export default (req,res,next)=>{
    let token = req.cookies['Token'];

    let decoded = TokenDecode(token)
    //console.log(decoded);

    if(decoded===null){
        res.status(401).json({status:"Fail",message:"Unauthorized"})
    }
    else {
        let email=decoded.email;
        let user_id=decoded.user_id;
        req.headers.email=email;
        req.headers.user_id=user_id;
        next()

    }
}