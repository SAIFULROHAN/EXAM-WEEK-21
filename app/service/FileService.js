import path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';


const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);


// Upload File

export const UploadFileService = async (req, res) => {
    //console.log(req.files.file);

    try {
        let files = req.files.file
        for(let i=0; i<files.length; i++) {
            const uploadPath = path.join(_dirname,'../../uploads', Date.now() + "-" + files[i].name);
            files[i].mv(uploadPath, (err) => {
                if (err) {
                    return {status: true, data: "Error Occurred while uploading file"};
                }
            })
        }
        return {status: true, data:"File Upload Successful"};
    } catch(err){
        return  {status:"error",error:err.toString()};
    }
}

// File Read Service

export const FileReadService = async (req,res)=>{
    try {
        const filename = req.params.fileName;
        const filePath = path.join(_dirname,'../../uploads',filename);
        return filePath
    } catch(err){
        return {status:false,data: err.toString()};
    }
}

// Delete Single File Service
export const DeleteSingleFileService = async (req,res)=>{
    try {
        const filename = req.params.fileName;
        const filePath = path.join(_dirname,'../../uploads',filename);

        fs.unlink(filePath, (err) => {
            if(err){
                res.status(500).send('Error Deleting File');
            }
        })
        return {status:true,data:"File Deleted Successfully"};
    } catch(err){
        return  {status:false,error:err.toString()};
    }
}