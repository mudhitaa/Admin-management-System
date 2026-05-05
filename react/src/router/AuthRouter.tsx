import AuthLayout from "../pages/Layout/AuthLayout"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage"


export const AuthRouter=
        [{path :"/",element:<AuthLayout/>, children:[
                {index:true ,element:<LoginPage/>},
                {path :"register",element:<RegisterPage/>},
                {path:"forget-password",element:<ForgetPasswordPage/>},
            ]},
        ]
