import {config} from "dotenv";

config();
//reads .env file and loads into process.env

export const CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}

export const MongodbConfig:{url:string, dbName:string} = {
    url : process.env.MONGODB_URL as string,
    dbName: process.env.MONGODB_DBNAME as string
}

export const JwtSecret = process.env.JWT_SECRET;