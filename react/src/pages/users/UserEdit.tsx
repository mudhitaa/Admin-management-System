import { FormLable,FormInput,FormFileInput,FormSelect, FormTextArea } from "../../components/form/Input"
import { FormActionButton } from "../../components/form/Button"
import {useForm} from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type { IUserUpdateFormData } from "../../types/AuthType"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"
import axiosInstance from "../../config/axiosConfig"
import { useEffect } from "react"


const UserUpdateDTO =z.object({
    name: z.string().nonempty('name required').nonoptional(),
    bio: z.string().nullable().optional(),
    gender:z.string().regex(/^(male|female|others)$/),
    role: z.string().nonempty('role required').nonoptional(),
    phone:z.string().optional(),
    address:z.string().optional(),
    image : z.instanceof(File).nullable(),

})
export default function UserEdit(){
    
    const {handleSubmit,control,formState:{errors, isSubmitting},setValue}= useForm<IUserUpdateFormData>({
        defaultValues: {
                name:"",
                role:"",
                bio:"",
                gender:"",
                phone:"",
                address:"" ,   
                image:null,
        },
        resolver:zodResolver(UserUpdateDTO)
    })

    const params = useParams()
    const navigate = useNavigate()
    const getUserDetail = async()=>{
        try{
            const response = await axiosInstance.get(`/auth/${params.id}/detail`)
            setValue('name',response.data.data.name)
            setValue('bio',response.data.data.bio)
            setValue('gender',response.data.data.gender)
            setValue('role',response.data.data.role)
            setValue('phone',response.data.data.phone)
            setValue('address',response.data.data.address)
        }catch{
            toast.error("error fetching user data")
            navigate("/users/all-users")
        }
    }

    useEffect(()=>{
        getUserDetail()
    },[])


    const submitForm =async (data:IUserUpdateFormData)=>{
        try{
            await axiosInstance.put('/auth/'+params.id, data,{
                headers:{"Content-Type":"multipart/form-data"}
            })
            toast.success("your profile has beed updated!!")
            navigate('/users/all-users')
        }catch{
            toast.error("error while updating user!!")
        }
    }
    return(
        <>
         <section className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-5" >
                   <div className="flex flex-col justify-between w-full gap-5">
                    <h1 className="flex text-gray-950 font-semibold text-xl">
                        Update User
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
                                                    <FormLable htmlfor="bio">bio:</FormLable>
                                    
                                                    <div className="w-2/3">
                                                    <FormTextArea 
                                                    name="bio"
                                                    handler={control}
                                                    errMsg={errors?.bio?.message}/>
                                                    </div>
                                              </div>
                                            <div className="w-full flex gap-5">
                                                    <FormLable htmlfor="gender">gender:</FormLable>
                                    
                                                    <div className="w-2/3">
                                                    <FormSelect handler={control} name="gender" options={[
                                                        {label:"male" , value:"male"},
                                                        {label:"female" , value:"female"},
                                                        {label:"others" , value:"others"}
                                                    ]} errMsg={errors?.gender?.message}/>
                                                    </div>
                                              </div>
                                            
                                            <div className="w-full flex gap-5">
                                                    <FormLable htmlfor="phone">phone:</FormLable>
                                    
                                                    <div className="w-2/3">
                                                        <FormInput type ="text" name="phone" handler={control} errMsg={errors?.phone?.message}/>
                                                    </div>
                                            </div>
                                            <div className="w-full flex gap-5">
                                                    <FormLable htmlfor="address">address:</FormLable>
                                    
                                                    <div className="w-2/3">
                                                        <FormInput type ="text" name="address" handler={control} errMsg={errors?.address?.message}/>
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
                                                <FormActionButton disabled ={isSubmitting} submitBtnTxt='Update'/>
                                            </div>
                                            
                                            
                        </form>
                    </div>
                </div>
                </section></>
    )
}