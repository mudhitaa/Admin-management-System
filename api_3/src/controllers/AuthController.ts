/// <reference path="../types/express/index.d.ts" />
import { type Request,type Response, type NextFunction } from "express"
import { IAuthController, IAuthRequest } from "../types/authTypes"
import { CloudinaryConfig, JwtSecret } from "../config/AppConfig"
import {v2 as cloudinary} from "cloudinary";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel";
import { Iuser } from "../types/UserType";
import jwt from "jsonwebtoken"

class AuthController implements IAuthController{
    constructor(){
        cloudinary.config(CloudinaryConfig)
    }

    async userlogin(req:Request, res:Response, next:NextFunction) {
        // incoming data to req
        //outgoing data to res
        try{
            const {email,password} = req.body
            //db check email existance
            const UserDetail = await UserModel.findOne({
                email: email
            })
            if(!UserDetail){
                throw{code:422, message:"user not registered"}
            }else{
                if (!bcrypt.compareSync(password, UserDetail.password)){
                    throw{code:422, message:"credintials not match"}
                }else{
                    //password verified
                    //token =>JWT token

                    const token = jwt.sign({sub:UserDetail._id}, JwtSecret as string, {
                        expiresIn:"1d"
                    })
                    res.json({
                        data: token,
                        message :"user logdded in",
                        status : "true"
                    })
                }
            }
        }
        catch(exception){
            next(exception)
        }
    }




    async userregister(req:Request, res:Response, next:NextFunction) {
        try{
            const data = req.body;
        
                //password
                data.password = bcrypt.hashSync(data.password,12)  //12 is salt used for encryption


                if(req.file){
                    data.image={
                        url: req.file?.path,
                        optimized: cloudinary.url(req.file?.filename as string, {
                            transformation: [{ aspect_ratio:"1.0, width:1200", crop :"fit"},
                                            {fetch_format:"auto"}  
                            ]
            
                            }),  //It generates a new URL that:resizes image,keeps aspect ratio,auto converts format (webp / avif)improves performanceSame image, different URL
                        id: req.file?.filename,
                    }
                }
                    
                
                //db store
                const userDetail = new UserModel(data)
                await userDetail.save()        //user register


                
                res.json({
                        data:{
                            _id: userDetail._id,
                            name: userDetail.name,
                            email: userDetail.email,
                            role:userDetail.role,
                            bio: userDetail.bio,
                            gender:userDetail.gender,
                            image:userDetail.image,
                            address:userDetail.address,
                            phone:userDetail.phone,
                            createdAt:userDetail.createdAt,
                            updatedAt:userDetail.updatedAt,

                        } as unknown as Iuser,
                        message:"user registered successfully",
                        status:true
                })
                //controller
                //db operation
                /* res.json({
                    data: {
                        accessToken: "register",
                    }
                }) */

                    /* const header = req.headers;
                    const query = req.query;
                    const params = req.params;
                    */
        }catch(exception:any){
            next(exception)
        }
        
    }





    async getLoggedInUserProfile(req:Request, res:Response, next:NextFunction){
        // req . token header\
        let loggedInUserProfile = req.loggedInUser
        res.json({
            data: loggedInUserProfile,
            message:"your profile",
            status:true,
        })
    }




    async updateMyProfile(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        const loggedInUser = req.loggedInUser;

        let userDetail = await UserModel.findById(req.params.userId);

        if (!userDetail) {
            throw { code: 404, message: "User not found" };
        }

        if(req.file){
                    data.image={
                        url: req.file?.path,
                        optimized: cloudinary.url(req.file?.filename as string, {
                            transformation: [{ aspect_ratio:"1.0, width:1200", crop :"fit"},
                                            {fetch_format:"auto"}  
                            ]
            
                            }),  
                        id: req.file?.filename,
                    }
                }



        // Authorization check
        if (
            loggedInUser?.role === "admin" ||
            userDetail._id.equals(loggedInUser?._id as string)
        ) {

            userDetail = await UserModel.findByIdAndUpdate(
                userDetail._id,
                data,
                { new: true } 
            );

            if (!userDetail) {
                throw { code: 500, message: "User update failed" };
            }

            res.json({
                data: {
                    _id: userDetail._id,
                    name: userDetail.name,
                    email: userDetail.email,
                    role: userDetail.role,
                    bio: userDetail.bio,
                    gender: userDetail.gender,
                    image: userDetail.image,
                    address: userDetail.address,
                    phone: userDetail.phone,
                    createdAt: userDetail.createdAt,
                    updatedAt: userDetail.updatedAt,
                } as unknown as Iuser,
            });

        } else {
            throw { code: 403, message: "You dont have access to update" };
        }

    } catch (exception) {
        next(exception);
    }
    }



    async deleteUser(req: IAuthRequest, res: Response, next: NextFunction):Promise<void> {
        try{
            const userId = req.params.userId;
            const loggedInUser = req.loggedInUser

            const userDetail = await UserModel.findById(userId)
            if(!loggedInUser){
                throw{ code:401,message:"user not authenticated"}
            }
            if(userDetail?._id.equals(loggedInUser?._id as string)){
                throw{ code:422,message:"you are not allowed to update your own account"}
            }
            if(!userDetail){
                throw{code:404, message:"user not found"}
            }else{
                const del = await UserModel.findByIdAndDelete(userId)
                res.json({
                    data:null,
                    status:true,
                    message:"user deleted successfully"
                })
            }
        }catch(exception){
            next(exception)

        }
    }


    async getAllUsers(req: IAuthRequest, res: Response, next: NextFunction):Promise<void>{
        try{
            const filter ={
                _id :{$ne : req.loggedInUser?._id},
            }
            const userList =await UserModel.find(filter)
            res.json({
                data: userList,
                message:"User list",
                status:true,
            })
        }catch(exception){
            next(exception)
        }
    }


    async getUserById(req: IAuthRequest, res: Response, next: NextFunction):Promise<void>{
        try{
            const userDetail =await UserModel.findById(req.params.userId)
            res.json({
                data:{
                    _id: userDetail?._id,
                            name: userDetail?.name,
                            email: userDetail?.email,
                            role:userDetail?.role,
                            bio: userDetail?.bio,
                            gender:userDetail?.gender,
                            image:userDetail?.image,
                            address:userDetail?.address,
                            phone:userDetail?.phone,
                            createdAt:userDetail?.createdAt,
                            updatedAt:userDetail?.updatedAt,
                },
                message:"User detail by Id",
                status:true,
            })
        }catch(exception){
            next(exception)
        }
    }
}


export default AuthController











/* export const userlogin = (req:Request, res:Response, next:NextFunction) => {
    // incoming data to req
    //outgoing data to res
    res.json({
        data: {
            accessToken: "vhbcvhc",
        }
    })
}

export const userregister = (req:Request, res:Response, next:NextFunction) => {
    //controller
    //db operation
} */