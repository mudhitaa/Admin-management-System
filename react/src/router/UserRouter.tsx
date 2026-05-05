//import UserLayout from "../pages/Layout/UserLayout"
import UserDashboard from "../pages/dashboard/UserDashboard"
import ErrorPage from "../pages/errors/ErrorPage"
import UserList from "../pages/users/UserList"
import UserCreate from "../pages/users/UserCreate"
import UserDetail from "../pages/users/UserDetail"
import UserEdit from "../pages/users/UserEdit"
import { lazy } from "react"
const UserLayout = lazy(async()=>await import('../pages/Layout/UserLayout'))

export const UserRouter=[
    {path:"/users", element:<UserLayout/>, children:[
        {index:true ,element:<UserDashboard/>},
        {path:"all-users" ,element:<UserList/>},
        {path:"create-user" ,element:<UserCreate/>},
        {path:":id/detail" ,element:<UserDetail/>}, 
        {path:":id/edit" ,element:<UserEdit/>}, 
        {path :"*",element:<ErrorPage/>},
    ]},
]
