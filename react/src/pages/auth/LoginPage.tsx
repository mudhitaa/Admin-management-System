
import { useOutletContext } from "react-router";
import LoginForm from "../../components/auth/LoginForm";
import {  Heading2 } from "../../components/typography/Heading";
import { RedirectLink } from "../../components/ui/Links";
import type { IAuthLayoutOutletContext } from "../Layout/authLayout.contract";
import { useEffect } from "react";

export default function LoginPage() {

    

    //outlet context
    const OutletContext=useOutletContext<IAuthLayoutOutletContext>()

    useEffect(()=>{
        OutletContext.setSidePanel({
            title:"Login Page",
            subtitle:"login subtitle"
        })
    },[])
    return (
        <>
          
                <Heading2 maintext="Login Form" subtext="text-red-500"/>

                <LoginForm/>
                <div className="flex w-full items-center justify-center gap-3">
                <RedirectLink url ="/register" txt ="Signup Today!" className="w-2/3 rounded-full bg-pink-700/10 border p-1 border-pink-700/30 text-white text-center cursor-pointer transition hover:scale-98 hover:underline"/>
                </div>
                
        </>
    )
}