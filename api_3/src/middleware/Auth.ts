import type { NextFunction, Request, Response } from "express"; 
import  Jwt  from "jsonwebtoken";
import { JwtSecret } from "../config/AppConfig";
import UserModel from "../models/UserModel";
import { Iuser } from "../types/UserType";
export type UserRoles = "admin"|"seller"| "customer";
export type AllowedRolesType = Array<UserRoles> |null


const Auth =(allowedRoles:AllowedRolesType=null)=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        
        //validate
        try{
            let token = req.headers['authorization'] ?? null;
            if(!token){
                next({code: 401 , message:"login required",})
            }else{
                token = token.replace("Bearer ","")

                const data = Jwt.verify(token, JwtSecret as string)
                

                //user detail read
                const userDetail = await UserModel.findOne({_id:data.sub}) as unknown as Iuser
                if(!userDetail){
                    throw{code:401, mssage:"user not found"}
                }else{
                    if
                     (
                    (allowedRoles && allowedRoles.includes(userDetail.role as UserRoles))
                    || 
                    !allowedRoles|| 
                     userDetail.role === 'admin'){

                         req.loggedInUser ={
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
                        } 
                        next()
                }else{
                    throw{code:403, mssage:"user is not allowed access here"}
                }
                }
            }

        }catch(exception){
            if(exception instanceof Jwt.JsonWebTokenError || exception instanceof Jwt.TokenExpiredError){
                next({code: 401 , message:exception.message,})
            }else{
                //rolee check
                next(exception)
                
            }
        }
    }
}

export default Auth