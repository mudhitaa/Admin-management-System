import RegisterForm from "../../components/auth/RegisterForm"
import { Heading2 } from "../../components/typography/Heading"
import { OutlinedLink } from "../../components/ui/Links"
import { useEffect } from "react"
import type { IAuthLayoutOutletContext } from "../Layout/authLayout.contract";
import { useOutletContext } from "react-router";

export default function RegisterPage() {
    //outlet context
    const OutletContext=useOutletContext<IAuthLayoutOutletContext>()

    useEffect(()=>{
        OutletContext.setSidePanel({
            title:"Signup Page",
            subtitle:"Signup subtitle"
        })
    },[])

    return (
        <>
          
                          <Heading2 maintext="Signup Form" subtext="text-red-500"/>
          
                          <RegisterForm/>

                            <div className="flex w-full items-center justify-center gap-3">
                            <OutlinedLink url="/" txt="Already have an account?"/>
                            </div>
        </>
    )
}