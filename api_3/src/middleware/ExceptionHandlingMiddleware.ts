import { Request,  Response,  NextFunction } from "express";


const ExceptionhandlingMiddleware =(error:any, req:Request, res:Response, next:NextFunction)=>{
   let code = error.code || 500;
   let detail = error.details || error.detail || null;
   let message = error.message || "Application error";


    res.status(code).json({
        data:detail,
        status:false,
        message:message,    
    })
}

export default ExceptionhandlingMiddleware;