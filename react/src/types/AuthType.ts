import * as z from "zod";
export interface IForgetpasswordData{
    email:string;
    password?:string;
}

export interface IRegisterFormData{
    name:string;
    email:string;
    password:string;
    confirmpassword:string;
    role:string;
    image: File|null
}
export interface IUserUpdateFormData {
  name: string;
  role: string;
  bio?: string | null;
  phone?: string;
  gender: string;
  address?: string;
  image: File | null;
}

export interface Icredientials{
    email:string;
    password:string;
}


export const LoginDTO =z.object({
    //email: z.email().nonempty('email required').nonoptional(),
    email: z.string().nonempty('username required').nonoptional(),
    password: z.string().nonempty('password required').nonoptional(),

})

export const LoginDefaultValues={
            //email:"",
            email:"",
            password:""
}