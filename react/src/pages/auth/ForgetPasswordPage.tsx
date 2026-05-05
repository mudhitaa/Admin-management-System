import ForgetPasswordForm from "../../components/auth/ForgetPasswordForm"
import { Heading2 } from "../../components/typography/Heading"
import { OutlinedLink } from "../../components/ui/Links"
import type { IAuthLayoutOutletContext } from "../Layout/authLayout.contract";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

export default function ForgetPasswordPage(){

    //outlet context
    const OutletContext=useOutletContext<IAuthLayoutOutletContext>()

    useEffect(()=>{
        OutletContext.setSidePanel({
            title:"Forget password Page",
            subtitle:"Forget password subtitle"
        })
    },[])

    return(
        <>
                             
            <Heading2 maintext="Forget Password?" subtext="text-red-500"/>
            <ForgetPasswordForm/>
             <div className="flex w-full items-center justify-center gap-3">
               <OutlinedLink url="/" txt="Login here"/>
               <span>Or</span>
               <OutlinedLink url="/register" txt="Signup here"/>
            </div>
         </>
    )
}