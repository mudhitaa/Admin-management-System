export interface Iuser{
    _id: string,
    name:string,
    email: string,
    role:string,
    bio: string,
    gender:string,
    image:{
        id: string,
        url: string,
        optimized: string,
    },
    address:string,
    phone:string,
    createdAt:string,
    updatedAt:string,
}