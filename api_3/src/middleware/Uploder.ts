import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import { CloudinaryConfig } from "../config/AppConfig";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const uploader = ()=>{

    cloudinary.config({
        cloud_name: CloudinaryConfig.cloud_name,
        api_key: CloudinaryConfig.api_key,
        api_secret: CloudinaryConfig.api_secret
    })

    //storage
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder :"api-3",
            allow_formats: ["jpg","png","jpeg","pdf","docx","svg"] ,   
        } as any
            
    })
    

    return multer({
        storage:storage,
        limits :{
            fileSize: 5 * 1024 * 1024 //5MB
        }})
}

export default uploader;