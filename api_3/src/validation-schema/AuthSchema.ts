import { z } from "zod";

export const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,25}$/


export const UserRegisterSchema = z.object({
    name: z.string().min(2,"Name must be of atleassst 2 char long").max(50,"too long"),

    email: z.email("Invalid email address").nonempty("Email is required"),

    password: z.string().regex(PasswordRegex, "Password must be strong").trim().nonempty("Password is required"),

    confirmpassword: z.string().trim().nonempty("rePassword is required"),

    //role: z.enum(["customer","seller"], "Role must be either 'customer' or 'seller'").default("customer"),
    role:z.string().regex(/^(customer|seller)$/, "Role must be either 'customer' or 'seller'").default("customer"),

    /* //image: "string"
    bio: z.string().optional(),

    gender: z.enum(["male", "female", "others"]).optional(),

    address: z.string().optional(),

    phone: z.string().optional(), */
}).refine((data) => data.password === data.confirmpassword, 
    {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });



export const UserProfileSchema = z.object({
    name: z.string().min(2,"Name must be of atleassst 2 char long").max(50,"too long"),
    bio: z.string().min(3).max(500),
    role:z.string().regex(/^(customer|seller)$/, "Role must be either 'customer' or 'seller'").default("customer"),
    address :z.string().nonempty().min(1).max(100),
    gender: z.enum(["male", "female", "others"]).optional().nullable(),
    phone: z.string().optional().nullable(),

})



export const UserLoginSchema = z.object({
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z.string().regex(PasswordRegex, "Password must be strong").trim().nonempty("Password is required"),
})