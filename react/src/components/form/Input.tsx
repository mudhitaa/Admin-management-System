import { Controller, useController } from "react-hook-form";
import { type IFormInput, type IFormLable, type IFormSelectProps, type ISingleOption , type IFileFormInput, type IFormTextArea} from "../../types/InputType";
import type { BaseSyntheticEvent } from "react";



export const FormInput =({type,name,handler,errMsg=''}:Readonly<IFormInput>)=>{
    
    const{field}= useController({
        name:name,
        defaultValue:"",
        control:handler,
    })
    
    return(
       <>
             <input 
                    type={type}
                    id={name}
                    {...field}
                    className="border p-2 border-pink-400 bg-pink-50 w-full rounded-md" />
                    <span className="text-red-600 italic text-sm">{errMsg}</span>
       </>
    )
}


export const FormTextArea =({name,handler,errMsg=''}:Readonly<IFormTextArea>)=>{
    
    const{field}= useController({
        name:name,
        control:handler,
    })
    
    return(
       <>
             <textarea 
                    id={name}
                    rows={5}
                    {...field}
                    className="border p-2 border-pink-400 bg-pink-50 w-full rounded-md resize-none" />
                    <span className="text-red-600 italic text-sm">{errMsg}</span>
       </>
    )
}


export const FormFileInput =({name,handler,errMsg='', isMultiple=false}:Readonly<IFileFormInput>)=>{
    
    const{field}= useController({
        name:name,
        control:handler,
    })
    
    return(
       <>
             <input 
                    type="file"
                    id={name}
                    onChange={(e:BaseSyntheticEvent)=>{
                        //single or multiple
                        const files = e.target.files;
                        if(isMultiple){
                            field.onChange(Object.values(files))
                        }else{
                            field.onChange(files[0])
                        }
                    }}
                    className="border p-2 border-pink-400 bg-pink-50 w-full rounded-md" />
                    <span className="text-red-600 italic text-sm">{errMsg}</span>
       </>
    )
}



export const FormSelect =({name,handler,options}:Readonly<IFormSelectProps>)=>{
    return(
       <>
             <Controller
             name ={name}
             control={handler}
             render={({field})=>{
                return(
                    <>
                    <select 
                    {...field}
                    className="border p-2 border-pink-400 bg-pink-50 w-full rounded-md">

                        <option value="">--select any one--</option>
                        {options && options.map((val:ISingleOption, ind:number)=>{
                            return <option key={ind} value = {val.value}>
                                    {val.label}
                            </option>
                        })}  

                    
                    </select>
                    
                    </>
                    
                )
             }}
             ></Controller>
       </>
    )
}

export const FormLable =({htmlfor,children}:Readonly<IFormLable>)=>{
    return(
    <>
        <label htmlFor={htmlfor}  
        className="text-lg w-1/3">{children}</label>
    </>
    )
}