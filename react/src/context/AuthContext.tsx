import type { Icredientials } from "../types/AuthType";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Iimage } from "../types/GlobalType";

export type IUser =
    {
        _id: string
        address:string
        bio: string
        createdAt:string
        email:string
        gender:string
        image:Iimage
        name:string
        phone:string
        role:string
        updatedAt:string

}



export interface IAuthContext{
    login: (data:Icredientials)=>Promise<IUser | void>,
    getLoggedInUser: () => Promise<IUser | void>,
    loggedInUser: IUser | undefined,
    setLoggedInUser: Dispatch<SetStateAction<IUser|undefined>>
}

const AuthContext = createContext<IAuthContext>({
    login: async ():Promise<IUser | void>=>{},
    getLoggedInUser: async (): Promise<IUser | void> => {},
    loggedInUser: undefined,
    setLoggedInUser: ():void=>{}
});

export default AuthContext;