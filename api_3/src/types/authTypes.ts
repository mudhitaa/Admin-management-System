import { type Request, type Response, type NextFunction } from "express";
import { Iuser } from "./UserType";

export interface IAuthController{
    userlogin (req:Request, res:Response, next:NextFunction):void;
    userregister (req:Request, res:Response, next:NextFunction):void;
    getLoggedInUserProfile(req:Request, res:Response, next:NextFunction):void;
    updateMyProfile(req:Request, res:Response, next:NextFunction):void;
    deleteUser(req:Request, res:Response, next:NextFunction):void;
    getAllUsers(req:Request, res:Response, next:NextFunction):void;
    getUserById(req:Request, res:Response, next:NextFunction):void;

}

export interface IAuthRequest extends Request{
    loggedInUser ?: Iuser
}