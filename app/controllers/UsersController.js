import {StudentRegistrationService,StudentLoginService,StudentProfileReadService,StudentProfileUpdateService} from "../service/UserService.js";


export const Registration=async (req,res)=>{
    let result = await StudentRegistrationService(req)
    return res.json(result)

}


export const Login=async (req,res)=>{
    let result = await StudentLoginService(req,res)
    return res.json(result)

}




export const ReadUserProfile=async (req,res)=>{
    let result = await StudentProfileReadService(req)
    return res.json(result)

}


export const UpdateUserProfile=async (req,res)=>{
    let result = await StudentProfileUpdateService(req)
    return res.json(result)

}