import type { ISidePanel } from "../../pages/Layout/authLayout.contract"
import { Heading1 } from "../typography/Heading"

export const AuthLeftSidePanel=({title,subtitle}:Readonly<ISidePanel>)=>{
    return(
        <>
        <div className=" bg-pink-900 p-4 hidden lg:flex lg:w-1/2 xl:w-1/3 flex-col items-center h-screen text-white justify-center">
                <div className="text-center justify-center h-screen flex flex-col"> 
                <Heading1  pagetitle={title}/>
                <div className="flex flex-col text-center">
                {subtitle}
                </div>
                
                </div>

                
            </div>
        </>
    )
}