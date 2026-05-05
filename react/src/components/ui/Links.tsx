import type { ReactNode } from "react";
import { NavLink } from "react-router";

export interface IOutlinedLink{
    url:string;
    txt:ReactNode;
    className?:string;
}

export const OutlinedLink =({url,txt,className}:Readonly<IOutlinedLink>)=>{
    return(
        <>
        <NavLink to={url} 
        className={`${className} w-2/3 rounded-full bg-pink-700/10 border p-1 border-pink-700/30 text-white text-center cursor-pointer transition hover:scale-98 hover:underline`}>
        {txt}</NavLink>
        </>
    ) 
}

export const RedirectLink =({url,txt,className}:Readonly<IOutlinedLink>)=>{
    return(
        <NavLink to={url} className={`${className}`}>{txt}</NavLink>
    )
}