
import { FormInput, FormLable } from "../form/Input";
import { RedirectLink } from "../ui/Links";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Icredientials, LoginDefaultValues, LoginDTO } from "../../types/AuthType";;


//import Cookies from "js-cookie";
//import axiousInstance from "../../config/axiosConfig";

import {  useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
//import { Navigate } from "react-router";





export default function LoginForm() {

    const {handleSubmit,control, formState:{errors}} = useForm<Icredientials>(
    {
        defaultValues: LoginDefaultValues,
        resolver: zodResolver(LoginDTO)

    })
    
    const {login}= useAuth();
    const navigate = useNavigate()

    const handleloginsubmit = async (data: Icredientials)=>{
        try{ 
            //data send for login api => we get the response from here
           const userDetail = await login(data) 
           console.log(userDetail)
           return navigate("/users")
            
        }catch(exception){
            console.log({exception})
        }
    }
    
    console.log(errors)
    return (
        <>
        <form  className="flex flex-col gap-5 " onSubmit={handleSubmit(handleloginsubmit)}>
                    <div className="w-full flex flex-col gap-1 xl:flex-row">
                            <FormLable htmlfor="email">email:</FormLable>
            
                            <div className="w-full">
                                <FormInput type ="email" name="email" handler={control} errMsg={errors?.email?.message}/>
                            </div>
                      </div>
                    <div className="w-full flex flex-col gap-1 xl:flex-row">  
                            <FormLable htmlfor="password">password:</FormLable>
                             <div className="w-full">
                                <FormInput type ="password" name="password" handler={control} errMsg={errors?.password?.message}/>
                                <div className="flex justify-end">
                                    <RedirectLink
                                        url="/forget-password"
                                        txt="Forget password?"
                                    />
                                </div>

                             </div>
                            
                    </div>

                    <div className="flex w-full gap-3 ">
                        <button type="submit" className="w-full bg-green-700 rounded-md text-white transition hover:scale-98 cuorsor-pointer">login</button>
                        <button type="reset" className="w-full bg-red-700 rounded-md text-white transition hover:scale-98 cuorsor-pointer">cancle</button>
                    </div>
                    
                    
        </form>
        </>
    )
}



//sideEffect
    /* useEffect(()=>{
        console.log("any changes")
    });
    useEffect(()=>{
        console.log("componenet mounted")
    },[]);
    useEffect(()=>{
        console.log("credientials changed")
    },[credientials]); */



    //try block kobhitrako {
    //      //api_endpoint:https://dummyjson.com/auth/login
            //method:POST
            //payload:data to sent to server{username:string ,password:string , expiresInMins:number}
            //headers: custom headers
    
    
    
            /* //webstorage
            const response = {accessToken: "abcd123"}
            Cookies.set("_at57",response.accessToken,{
                expires:1,
                domain:"localhost",
                path:"/users",
                sameSite:"strict",
                secure:true,
            })
            //Cookies.remove("_at57")
            //Cookies.get("_at57")
            
            localStorage.setItem("_at57",response.accessToken);
            //sessionStorage.setItem("_at57",response.accessToken);
            const token =localStorage.getItem("_at57");
            console.log("token:",token)
    
            //localstorage.removeItem("_at57")
            //localstorage.clear() */
           
            
    
    
    
    
            //const navigate = useNavigate()
            //e.preventDefault()
            //navigate("/users")
            //return<Navigate to ="/users"/>
            
            //}