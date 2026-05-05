import { useForm } from "react-hook-form";
import { FormFileInput, FormInput, FormLable,FormSelect } from "../form/Input";
import { type IRegisterFormData } from "../../types/AuthType";


import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axiosInstance from "../../config/axiosConfig";
//import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { FormActionButton } from "../form/Button";

const RegisterDTO =z.object({
    name: z.string().nonempty('name required').nonoptional(),
    email: z.email().nonempty('email required').nonoptional(),
    password: z.string().min(8).nonempty('password required').nonoptional(),
    confirmpassword: z.string().min(8).nonempty('confirm password required').nonoptional(),
    role: z.string().nonempty('role required').nonoptional(),
    image : z.file().nullable()

})
export default function RegisterForm() {


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
            navigate('/')
            
        }catch(exception){
            toast.error("error in registering")
        }
        }
/*     const [credientials,setCredentials]=useState({
            email:"",
            password:"",
            name:"",
        });

    console.log(credientials);


    const handleInputChange = (ev:BaseSyntheticEvent) => {
        const name = ev.target.name;
        setCredentials({
            ...credientials,
            [name]:ev.target.value
        })
    }  */
    
    
    return (
        
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
    )
}
