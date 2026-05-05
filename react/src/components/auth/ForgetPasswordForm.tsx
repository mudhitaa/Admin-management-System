
import { FormInput, FormLable } from "../form/Input";
import { type IForgetpasswordData } from "../../types/AuthType";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgetDTO =z.object({
    email: z.email().nonempty('email required').nonoptional(),
})



export default function ForgetPasswordForm() {

    const{control,handleSubmit,formState:{errors}}= useForm<IForgetpasswordData>({
        defaultValues: {email:""},

        resolver: zodResolver(ForgetDTO)
    })
 
    const submitForm=(data:IForgetpasswordData)=>{
        console.log(data)
    }

    return (
        
        <form onSubmit={handleSubmit(submitForm)} action="" className="flex flex-col gap-5 ">
                    <div className="w-full flex gap-5">
                            <FormLable htmlfor="email">email:</FormLable>
            
                            <div className="w-2/3">
                                <FormInput type ="email" name="email" handler={control} errMsg={errors?.email?.message}/>
                            </div>
                      </div>
                    

                    <div className="flex w-full gap-3 ">
                        <button type="submit" className="w-full bg-green-700 rounded-md text-white transition hover:scale-98 cuorsor-pointer">submit</button>
                        <button type="reset" className="w-full bg-red-700 rounded-md text-white transition hover:scale-98 cuorsor-pointer">cancle</button>
                    </div>
                    
                    
                </form>
    )
}
