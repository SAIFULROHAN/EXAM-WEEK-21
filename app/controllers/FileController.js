import {UploadFileService,FileReadService,DeleteSingleFileService} from "../service/FileService.js";

export const UploadFile = async (req, res) => {
    let result = await UploadFileService(req)
    return res.status(200).json(result)
}

export const FileRead = async (req, res) => {
    let result = await FileReadService(req,res);
    return res.sendFile(result);
}

export const DeleteSingleFile = async (req,res)=>{
    let result = await DeleteSingleFileService(req,res);
    return res.status(200).json(result);
}