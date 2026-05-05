import { NextFunction,Response } from "express";
import { IAuthRequest } from "../types/authTypes";
import { IChatController } from "../types/ChatType";
import ChatModel from "../models/ChatModel";
import { CloudinaryConfig } from "../config/AppConfig";
import {v2 as cloudinary} from "cloudinary";

class ChatController implements IChatController {

    constructor(){
            cloudinary.config(CloudinaryConfig)
        }

    async listAllChats (req:IAuthRequest,res:Response,next:NextFunction) :Promise<void>{
        try{
            const loggedInuser = req.loggedInUser
            const userId = req.params.userId 

            let filter = {
                $or: [
                    { sender: loggedInuser?._id, receiver: userId },
                    { sender: userId, receiver: loggedInuser?._id }
                ],
            };

            let page = req?.query?.page || 1
            let limit = req?.query?.limit || 50
            const skip =(+page -1)* +limit  //3-1  *50 

            const data = await ChatModel.find(filter)
                .populate("sender",["name","email","address","role","image"])
                .populate("receiver",["name","email","address","role","image"])
                .sort({createdAt :"desc"})
                .skip(skip)
                .limit(+limit)

            const total = await ChatModel.countDocuments(filter)

            res.json ({
                data:data || [],
                message:"chat message detail",
                status:true,
                meta : {pagination: {page:page ,limit :limit ,total:total}}
            })
        }catch(exeception){
            next(exeception)
        }
    }

    async createChat(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
        try{
            //data mapping
            const loggedInUser = req.loggedInUser
            const data = req.body
            data.sender = loggedInUser?._id

            if(req.file){
                    data.file={
                        url: req.file?.path,
                        optimized: cloudinary.url(req.file?.filename as string, {
                            transformation: [{ aspect_ratio:"1.0, width:1200", crop :"fit"},
                                            {fetch_format:"auto"}  
                            ]
            
                            }),  //It generates a new URL that:resizes image,keeps aspect ratio,auto converts format (webp / avif)improves performanceSame image, different URL
                        id: req.file?.filename,
                    }
                }


            //data store
            const chat = new ChatModel(data)
            await chat.save()
            const detail = await ChatModel.findById(chat._id)
            .populate("sender",['_id','name','email','role','image']) 
            .populate("receiver",['_id','name','email','role','image']) 
            
            res.json({
                data:detail,
                message:"message sent",
                status:true
            })


        }catch(exception){
            next(exception)
        }
    }

}

export default ChatController