import { createBrowserRouter,RouterProvider, } from "react-router";
import ErrorPage from "../pages/errors/ErrorPage";
import {AuthRouter} from "./AuthRouter";
import { UserRouter } from "./UserRouter";

const router = createBrowserRouter([

    ...AuthRouter,
    ...UserRouter,
 
    {path :"*",element:<ErrorPage/>},

])

export default function RouterConfig(){
    return(
        <>
            <RouterProvider router ={router}/>
        </>
    )
}