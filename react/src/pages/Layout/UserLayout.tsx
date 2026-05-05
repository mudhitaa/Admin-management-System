import { Outlet, useNavigate } from "react-router"; 
/* import { UserHeader } from "../../components/user/UserHeader";
import { UserSidebar } from "../../components/user/UserSidebar"; */
import {UserHeader,UserSidebar} from "../../components/user"
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { toast } from "sonner";
//import Cookies from "js-cookie";

export default function UserLayout() {
  /* const localStorageData = localStorage.getItem("_at57");
  console.log(localStorageData)
  const cookieData=Cookies.get("_at57");
  console.log(cookieData) */
  const{loggedInUser}=useAuth()
  const navigate= useNavigate()
  useEffect(()=>{
    if(!loggedInUser){
      toast.warning("you need to log in")
      navigate('/')
    }
  },[])
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <UserSidebar/>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <UserHeader/>

        {/* Content */}
        <main className="p-6">  
            <Outlet/>
        </main>
      </div>
    </div>
  );
}
