import UserModel from "../model/usersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js"
import {JWT_EXPIRE_TIME} from "../config/Config.js";
import md5 from 'md5';
import mongoose from "mongoose";
import EmailSend from '../utility/emailUtility.js'
const ObjectId = mongoose.Types.ObjectId;


// Registration Service
export const StudentRegistrationService=async (req)=>{

    try{
        let reqBody = req.body;
        reqBody.password = md5(req.body.password);

        let user = await UserModel.find({reqBody})
        if(user.length >0){
           return {status:"error",message:"Have Account"};
        } else {
            let data = await UserModel.create(reqBody);
           return  {status:"success",message:"Registration Successful",data:data}
        }
    }  catch(err){
        return  {status:"error",error:err.toString()};
    }
};



// Login Service

export const StudentLoginService=async (req,res)=> {

    try {
        // Ensure body is parsed correctly
        const reqBody = req.body;
        const email = reqBody.email;
        const password = md5(reqBody.password);

        // Use aggregation to find matching user
        const matchingStage = { $match: { email, password } };
        const projection = { $project: { _id: 1, email: 1 } };

        const data = await UserModel.aggregate([matchingStage, projection]);

        if (data.length > 0) {
            const token = TokenEncode(data[0].email);

            // Set Cookie
            const options = {
                maxAge: JWT_EXPIRE_TIME,
                httpOnly: true,
                sameSite: 'None', // Consider if you really need 'None'
                secure: true, // Ensure you're serving over HTTPS
            };
             res.cookie('Token', token, options);
            return { status: 'success', message: 'Login Successful', token, data: data[0] };
        } else {
            return { status: 'Unauthorized', message: 'Invalid email or password' };
        }
    } catch (err) {
        return  {status:"error",error:err.toString()};
    }
};




//ReadUserProfile

export const StudentProfileReadService = async (req)=>{
    let email = req.headers.email;
    try {
        let MatchStage = {
            $match: {email}
        };

        let project = {
            $project:{
                email:1,
                firstName:1,
                lastName:1,
                mobile:1,
            }
        }

        let data = await UserModel.aggregate([
            MatchStage,
            project
        ]);
        return {status:"success",message:"Profile Read Success",data:data}
    } catch(err){
        return  {status:"error",error:err.toString()};
    }

}

//UpdateUserProfile

export const StudentProfileUpdateService = async (req,res)=>{
    try {
        //let user_id = req.headers.user_id;
        let email = req.headers.email;
        let reqBody = req.body;
        reqBody.email = email;

        await UserModel.updateOne({email:email},{$set:reqBody},{upsert:true})
        return {status:"success",message:"Profile Update Successful"}
    } catch(err){
        return  {status:"error",error:err.toString()};
    }

}