import {type Dispatch, type ReactNode, type SetStateAction} from "react";

export interface ISidePanel{
    title:string,
    subtitle:ReactNode
}

export interface IAuthLayoutOutletContext{
    sidepanel:ISidePanel,
    setSidePanel:Dispatch<SetStateAction<ISidePanel>>

}
