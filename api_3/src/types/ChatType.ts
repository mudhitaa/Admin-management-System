import { NextFunction,Response } from "express";
import { IAuthRequest } from "../types/authTypes";


export interface IChatController {
    listAllChats(req:IAuthRequest,res:Response,next:NextFunction) :Promise<void>
    createChat(req:IAuthRequest,res:Response,next:NextFunction) :Promise<void>
}