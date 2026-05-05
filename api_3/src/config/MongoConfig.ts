import mongoose from "mongoose";
import { MongodbConfig } from "./AppConfig";

//IIFE
(async ()=>{
    //db connection
    try{

        await mongoose.connect(MongodbConfig.url,{
            dbName:MongodbConfig.dbName,
            autoCreate:true,
            autoIndex: true,
        })
        console.log("********Mongodb connected SUCCESS**********")
        

    }catch(execption){
        console.log("*******************************************")
        console.log(execption)
        console.log("*********Mongodb connection error**********")
        process.exit(1)
    }


})();     //immediately execute garna lai