
import { Outlet, useNavigate } from "react-router"
import { AuthLeftSidePanel } from "../../components/auth/AuthLeftSidePanel"
import { useEffect, useState } from "react"
import { type ISidePanel } from "./authLayout.contract"
import { useAuth } from "../../hooks/useAuth"
import { toast } from "sonner"

export default function AuthLayout(){
    const [sidepanel,setSidePanel]=useState<ISidePanel>({
        title:"welcome to dddefault",
        subtitle:"this is sub default"
})
const navigate=useNavigate()


const {loggedInUser} = useAuth()
useEffect(()=>{
    if(loggedInUser){
        toast.info("you are already logged in")
        navigate('/users')
    }
},[])

    return(
        <><section className="flex w-full h-screen" >
                    <AuthLeftSidePanel title={sidepanel.title} subtitle ={sidepanel.subtitle}/>
                    
                    
                    <div className="w-full lg:w-1/2 xl:w-2/3 p-1 mt-1 xl:p-10 xl:mt-10 r">
                        <div className="bg-pink-300 p-5 xl:p-10 shadow-lg rounded-md flex flex-col gap-10">
                            <Outlet context ={{
                                sidepanel,setSidePanel
                            }}/>

                        </div>
                        
                    </div>
        
                </section></>
    )
}