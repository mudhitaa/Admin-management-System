import { useForm } from "react-hook-form";
import { FormFileInput, FormInput, FormLable,FormSelect } from "../../components/form/Input";
import { type IRegisterFormData } from "../../types/AuthType";


import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axiosInstance from "../../config/axiosConfig";

import { toast } from "sonner";
import { useNavigate } from "react-router";
import { FormActionButton } from "../../components/form/Button";

const RegisterDTO =z.object({
    name: z.string().nonempty('name required').nonoptional(),
    email: z.email().nonempty('email required').nonoptional(),
    password: z.string().min(8).nonempty('password required').nonoptional(),
    confirmpassword: z.string().min(8).nonempty('confirm password required').nonoptional(),
    role: z.string().nonempty('role required').nonoptional(),
    image : z.file().nullable()

})


export default function UserCreate(){
    const{control,handleSubmit,formState:{errors, isSubmitting}}= useForm<IRegisterFormData>({
            defaultValues: {
                name:"",
                email:"",
                password:"",
                confirmpassword:"",
                role:"",
                image:null
            
            },
            resolver: zodResolver(RegisterDTO)
        })
     const navigate = useNavigate()
        const submitForm= async (data:IRegisterFormData)=>{
            try{
            console.log(data) 
 
            await axiosInstance.post('/auth/register',data,{headers:{
                "Content-Type":"multipart/form-data"
            }
            })

            toast.success("account registered success")
            navigate('/users/all-users')
            
        }catch(exception){
            toast.error("error in registering")
        }
        }
    return(
        <>
        <section className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-5" >
           <div className="flex flex-col justify-between w-full gap-5">
            <h1 className="flex text-gray-950 font-semibold text-xl">
                Create User
            </h1>

           

           <hr className="border-gray-200 border-1.5"/>



            <div className="grid grid-cols-1  gap-6">      
                <form onSubmit={handleSubmit(submitForm)} action="" className="flex flex-col gap-5 ">
                                    <div className="w-full flex gap-5">
                                            <FormLable htmlfor="name">name:</FormLable>
                            
                                            <div className="w-2/3">
                                                <FormInput type ="name" name="name" handler={control} errMsg={errors?.name?.message}/>
                                            </div>
                                      </div>
                                    <div className="w-full flex gap-5">
                                            <FormLable htmlfor="email">email:</FormLable>
                            
                                            <div className="w-2/3">
                                                <FormInput type ="email" name="email" handler={control} errMsg={errors?.email?.message}/>
                                            </div>
                                      </div>
                                    
                                    
                                    <div className="w-full flex gap-5">  
                                            <FormLable htmlfor="password">password:</FormLable>
                                             <div className="w-2/3">
                                                <FormInput type ="password" name="password" handler={control} errMsg={errors?.password?.message}/>
                                             </div>
                                            
                                    </div>
                                    <div className="w-full flex gap-5">  
                                            <FormLable htmlfor="confirmpassword">Re-password:</FormLable>
                                             <div className="w-2/3">
                                                <FormInput type ="password" name="confirmpassword" handler={control} errMsg={errors?.confirmpassword?.message}/>
                                             </div>
                                            
                                    </div>
                                    <div className="w-full flex gap-5">  
                                            <FormLable htmlfor="role">ROle:</FormLable>
                                             <div className="w-2/3">
                                                <FormSelect name="role" handler = {control} options={[
                                                    {value:"customer", label:"buyer"},
                                                    {value:"seller", label:"vender"}
                                                ]}></FormSelect>
                                             </div>
                                            
                                    </div>
                                    <div className="w-full flex gap-5">  
                                            <FormLable htmlfor="role">Image:</FormLable>
                                             <div className="w-2/3">
                                                <FormFileInput
                                                name="image"
                                                handler={control}
                                                />
                                             </div>
                                            
                                    </div>
                                    
                
                                    <div className="flex w-full gap-3 ">
                                        <FormActionButton disabled ={isSubmitting} submitBtnTxt='Register'/>
                                    </div>
                                    
                                    
                </form>
            </div>
        </div>
        </section>
        </>
    )
}