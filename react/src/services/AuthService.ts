
import Cookies from "js-cookie";
import axiosInstance from "../config/axiosConfig";
import { type Icredientials } from "../types/AuthType";

export const userLogin =async (data:Icredientials)=>{          
    console.log(data)     
    const response =await axiosInstance.post('/auth/login',{headers:{
                "Content-Type":"application/json"
            }
        })

    Cookies.set("_at_57",response.data.accessToken,{
                expires:3/24
    })

    //todo:2fauthentication
   

    const userDetail= await axiosInstance.get('/auth/me',{
        
        headers:{
             Authorization: "Bearer " + response.data.accessToken
             
        }
        }
    ) 

    return userDetail.data;  
    //console.log({userDetail})     
    //console.log({response})
}