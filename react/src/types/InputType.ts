import { type ReactNode } from "react";

export interface IFormInput{
    type:string;
    name:string;
    //eslint-disable-next-line
    handler:any
    errMsg?:string;
}
export interface IFormTextArea{
    name:string;
    //eslint-disable-next-line
    handler:any
    errMsg?:string;
}
export interface IFileFormInput{
    name:string;
    isMultiple?: boolean
    //eslint-disable-next-line
    handler:any
    errMsg?:string;
}

export interface ISingleOption{
    label:string,
    value:string
}
export interface IFormSelectProps{
    name:string;
    handler:any;
    options:Array<ISingleOption>;
    errMsg?:string;
}


export interface IFormLable{
    htmlfor:string;
    children:ReactNode;
}