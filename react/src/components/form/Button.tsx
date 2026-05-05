import type { ReactNode } from "react"

interface IFormActionButtonProps{
    cancleBtnTxt?:ReactNode,
    submitBtnTxt?:ReactNode,
    disabled?:boolean
}

export const FormActionButton = ({cancleBtnTxt='Cancel',submitBtnTxt='Submit', disabled=false}:Readonly<IFormActionButtonProps>)=>{
    return(
        <>
        <button 
        disabled={disabled}
        type="reset" className="w-full bg-red-700 rounded-md text-white transition hover:scale-98 cuorsor-pointer disabled:bg-red-800/4 disabled:cursor-not-allowed">{cancleBtnTxt}</button>
        <button type="submit" className="w-full bg-teal-700 rounded-md text-white transition hover:scale-98 cuorsor-pointer disabled:bg-red-800/4 disabled:cursor-not-allowed">{submitBtnTxt}</button>
        </>
    )
}