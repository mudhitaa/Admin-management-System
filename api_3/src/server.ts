import http from "http"
import express, {type Application} from "express";
import path from "path";
import router from "./router/router";
import ExceptionhandlingMiddleware from "./middleware/ExceptionHandlingMiddleware";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import {Server} from "socket.io";

// db config
import "./config/MongoConfig"
import { Error } from "mongoose";



const app: Application = express();


//security parameter
const allowedOrigins =["http://localhost:5173","http://localhost:3000"]
const corsOptions : CorsOptions={
    origin:function(origin,cb){
        if(!origin || allowedOrigins.includes(origin)){
            return cb(null,true)
        }else{
            cb(new Error("not allowed by cors"))
        }
    },
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true //headers/cookies
}
app.use(cors(corsOptions))
//xss prevent
app.use(helmet())
const limiter = rateLimit({
    windowMs: 60000,
    limit:30,
})
app.use(limiter)



const PORT = 9005;
const HOST="localhost"


//CORS => Cross origin reference site

//body parsing => backend will get the data after parsing only

//json
app.use(express.json({
    limit:"5mb"
}
))

//this parsing is for xxx-www-form-urlencoded
app.use(express.urlencoded())



//static middleware given by express
app.use('/assets',express.static(path.join(__dirname,'../public')));







//routing path declare
app.use("/api/v1/",router);



//unregistered route for global error handling 404 not found
app.use('/',(req,res,next)=>{
   next({code:404, message:"Route does not exist. Please check the url again"});
})

//error handling middleware
app.use(ExceptionhandlingMiddleware)


//http package server
const httpServer = http.createServer(app)

//socket server
const io = new Server(httpServer,{
    cors:{
        origin:"*"
    }
})

//event based operate
io.on("connection",(socket)=>{
    //console.log("connected socketID: ", socket.id)
    socket.on("messageSent",(data)=>{
        socket.broadcast.emit("messageRecieved", data)
    })
})


httpServer.listen(PORT,HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
        console.log(`Press CTRL+C to stop server`);
});



















//middleware
// can response data in json format

/* app.use ((req,res,next)=>{
    console.log("oneeee")
    next();
})
app.use ((req,res,next)=>{
    console.log("twoooooo")
    next("error aauna paro");
}) */
