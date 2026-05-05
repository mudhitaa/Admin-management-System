import { NavLink } from "react-router"
import type { IUser } from "../../context/AuthContext"
import { useAuth } from "../../hooks/useAuth"
import { nameImage, ucFirst } from "../../utilities/helpers"
import type { BaseSyntheticEvent } from "react"
import Swal from "sweetalert2"
import { toast } from "sonner"
import axiosInstance from "../../config/axiosConfig"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../config/store"
import { getAllUsers } from "../../reducer/user.reducer"


export const SingleUser = ({user}:Readonly<{user:IUser}>)=>{
    const{loggedInUser} = useAuth()
    const dispatch = useDispatch<AppDispatch>()

    const onDeleteClick = async (e:BaseSyntheticEvent)=>{
        try{
            e.preventDefault()
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            })
        if (result.isConfirmed){
            //delete
            await axiosInstance.delete('/auth/'+user._id)
            toast.success("user deleted succefully")
            dispatch(getAllUsers())
        }
        }catch(exception){
            toast.error("error deleting user")
        }
    }

    return(
        <>
         <div className="bg-grey-50 border border-gray-200 rounded-xl flex flex-col items-center p-6 hover:shadow-md transition">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-teal-800 rounded-full flex items-center justify-center text-white font-bold">
                            {nameImage(user.name)}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-950">{user.name}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-2 w-full justify-center flex-wrap">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Role :{ucFirst(user.role)}</span> 
                        {
                            user.gender && <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">Gender : {ucFirst(user.gender)}</span>
                        }
                    
                    </div>



                    <div className="flex gap-2 mb-2 w-full justify-center flex-wrap">
                        {
                            user.address && <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Address : {user.address}</span> 

                        }
                    </div>
                    <div className="flex gap-2">
                        <NavLink to = {'/users/'+user._id+'/detail'} className="flex-1 text-white bg-emerald-600  rounded p-2 hover:bg-teal-700 transition text-sm">
                            View
                        </NavLink>

                        {
                            loggedInUser && loggedInUser.role==='admin'?<>
                             <NavLink  to ={`/users/${user._id}/edit`} className="flex-1 text-white bg-orange-700  rounded p-2 hover:bg-orange-800 transition text-sm">
                                Edit
                            </NavLink>
                            <button 
                            onClick={onDeleteClick}
                            className="flex-1 text-white bg-red-600  rounded p-2 hover:bg-red-700 transition hover:cursor-pointer text-sm">
                                Delete
                            </button>
                            </>:<></>
                        }



                       
                    </div>
        </div>
        </>
    )
}