import { LuPlus } from "react-icons/lu";
import { NavLink } from "react-router";
import { SingleUser } from "../../components/user/SingleUser";
import { useEffect} from "react";
import { type IUser } from "../../context/AuthContext";
//import { toast } from "sonner";
//import axiosInstance from "../../config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootsState } from "../../config/store";
import { getAllUsers } from "../../reducer/user.reducer";


export default function UserList(){
 
    const dispatch = useDispatch<AppDispatch>()

    const userList = useSelector((state:RootsState)=>{
        return state?.user?.list
    })

    useEffect(()=>{
    
        dispatch(getAllUsers())
    },[])

    return(
        
         <section className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-5" >
           <div className="flex justify-between w-full">
            <h1 className="flex text-gray-950 font-semibold text-xl">
                User List
            </h1>


            <div className="w-1/3 flex gap-5">
                <form className="w-full">
                     <input type="search" className="border border-grey-400 w-full rounded-md p-2"/>
                </form>
                <div className={'w-50 flex'}>
                <NavLink 
                to={'/users/create-user'} 
                className={'w-full flex justify-center items-center bg-teal-800 text-white p-2 rounded-md hover:bg-teal-900 transition hover:scale-96'}
                >
                    <LuPlus/> Add user
                </NavLink>
                </div>
            </div>
           </div>

           <hr className="border-gray-200 border-1.5"/>



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">      
               
               {
                <>
                   {
                    userList && 
                    userList.map((user:IUser,index:number)=><SingleUser user={user} key ={index}/> )
                   }     
                </>
               }
                
        </div>

        </section>
        
    )
}