import { useEffect, useState } from "react";
import { type IUser } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import axiosInstance from "../../config/axiosConfig";
import { ucFirst } from "../../utilities/helpers";
import { LuUser } from "react-icons/lu";
import UserMessage from "../../components/user/UserMessage.tsx";
import socket from "../../config/socket";

export default function UserDetail() {
  const [detail,setDetail]=useState<IUser|undefined>()
  const params = useParams<{id:string}>()
  const navigate =useNavigate()
  

  const userDetailFetch = async()=>{
    try{
      const response =await axiosInstance.get("/auth/"+params.id+"/detail")
      setDetail(response.data.data)
    }catch{
      toast.error("error fetching user detail")
      navigate('/users/all-users')
    }
  }


  useEffect(()=>{
    socket.connect()
  },[])

  
  useEffect(()=>{
    userDetailFetch()
  },[params])

  return (
    <>
    {detail && (
      <section className="flex flex-col gap-5">  
          <section className="w-full shadow-lg bg-whita reunded-md p-5">
            <div className="w-full flex gap-10">


              <div className="w-1/4">
                <div className="size-50 lg:size-70 overflow-hidden">
                  {
                    detail.image? <img src={detail.image.url}   
                  className="bg-gray-200 w-full rounded-md shadow-xl border-2 border-gray-400" 
                  alt={detail.name} />
                  :
                  <LuUser className="bg-gray-200 w-full rounded-md shadow-xl border-2 border-gray-400 size-50 lg:size-70 overflow-hidden"/>
                  }
                </div>
              </div >



              <div className="w-3/4 flex flex-col gap-2">
                <h1 className="text-4xl text-green-900 underline">{detail.name}</h1>
                <div className="flex gap-2 w-full items-center mt-2">
                    <span className="font-semibold text-lg w-1/5">Email:</span>
                    <p className="text-md">{detail.email}</p>
                </div>
                <div className="flex gap-2 w-full items-center">
                    <span className="font-semibold text-lg w-1/5">Role:</span>
                    <p className="text-md">{ucFirst(detail.role)}</p>
                </div>
                <div className="flex gap-2 w-full items-center">
                    <span className="font-semibold text-lg w-1/5">Gender:</span>
                    <p className="text-md">{detail.gender}</p>
                </div>
                <div className="flex gap-2 w-full items-center">
                    <span className="font-semibold text-lg w-1/5">Phone:</span>
                    <p className="text-md">{detail.phone}</p>
                </div>
                <div className="flex gap-2 w-full items-center">
                    <span className="font-semibold text-lg w-1/5">Address:</span>
                    <p className="text-md">{detail.address}</p>
                </div>
                <div className="flex gap-2 w-full items-center">
                    <span className="font-semibold text-lg w-1/5">Detail:</span>
                    <div className="text-md">{detail.bio}</div>
                </div>
              </div>



            </div>

          </section>




          <section className="flex flex-col w-full shadow-lg bg-white rounded-md p-5 gap-5">
              <h1 className="text-4xl text-green-900 underline">Message</h1>
                  <UserMessage user = {detail}/>

                


          </section>
      </section>

    )}
    </>
  );
}