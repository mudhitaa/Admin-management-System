import { useEffect, useState, type ReactNode } from "react"
import AuthContext, { type IUser } from "../AuthContext"
import type { Icredientials } from "../../types/AuthType"
import Cookies from "js-cookie";
import axiosInstance from "../../config/axiosConfig";
import { Spinner } from "../../components/ui/Loading";


const AuthProvider =({children}:Readonly<{children: ReactNode}>)=>{
    
    const [loggedInUser , setLoggedInUser] = useState<IUser>()
    
    const [loading , setLoading] = useState<boolean>(true)

    const loginUser = async (data:Icredientials) : Promise<IUser>=>{
            
        const response =await axiosInstance.post('/auth/login',{...data})
        Cookies.set("_at_57",response.data.data,{
                expires:3/24
        })

        //todo:2fauthentication
        return await getLoggedInUser();
        
    }

    const getLoggedInUser = async () : Promise<IUser>=>{
            try{
                const userDetail= await axiosInstance.get('/auth/me') 
                setLoggedInUser(userDetail.data.data)
                return userDetail.data as IUser;  
                //console.log({userDetail})     
                 //console.log({response})
            }
            finally{
               setLoading(false) 
            }
    }

    useEffect(()=>{
       const token = Cookies.get("_at_57")
       if(token){
        setTimeout(()=>{
            getLoggedInUser()
        },1000)
        
       }else{
        setLoading(false)
       }
    },[])

    return loading ?(
        <div className="flex w-full h-screen bg-pink-100 items-center justify-center">
            <Spinner size="size-10"/>
        </div> 
    ):(
        <AuthContext.Provider 
        value={{
            login: loginUser,
            getLoggedInUser: getLoggedInUser,
            loggedInUser: loggedInUser,
            setLoggedInUser:setLoggedInUser,
           
        }}>
            {children}
            </AuthContext.Provider>
    )
}

export default AuthProvider