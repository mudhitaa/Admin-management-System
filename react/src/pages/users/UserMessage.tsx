import { useEffect, useRef, useState } from "react";
import type { IUser } from "../../context/AuthContext";
import { toast } from "sonner";
import axiosInstance from "../../config/axiosConfig";
import SendMessage from "../../components/chat/SendMessage";
import ChatMessageDetail from "../../components/chat/ChatDetail";
import socket from "../../config/socket";

export interface IMessageType {
  receiver: string, message:string, file?:File
}


export interface ISingleMessage{
  createdAt: Date,
  message: string,
  receiver: IUser,
  sender: IUser,
  updatedAt: Date,
  _id:string
}




export default function UserMessage({ user }: Readonly<{ user: IUser }>) {

  const [messages, setMessages] = useState<Array<ISingleMessage>>([])

  /* const [pagination , setPagination] = useState({
    limit:50,
    page:1,
    total:0
  }) */

  const getUserMessage = async({page=1,limit=50} :{page?:number , limit?:number})=>{
    try{
      const response = await axiosInstance.get("/chat/" +user._id,{
        params : {
          limit:limit,
          page:page,
        }
      })
      setMessages(response.data.data.reverse())
      //setPagination(response.data.meta.pagination)
    }catch{
      toast.error("error in fetching messages")
    }
  }

  useEffect(() => {
    //eslint-disable-next-line
    getUserMessage({
      page:1,
      limit:50
    })

    const handleMessageRecieved = async ()=>{
        getUserMessage({page:1, limit:50})
    }

    socket.on("messageReceived", handleMessageRecieved)

    return ()=>{
      socket.off("messageReceived", handleMessageRecieved)
    }
  
}, [])


  const messagesEndRef = useRef<HTMLDivElement| null>(null)


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);



  const submitMessage = async (data:IMessageType)=>{
    try{
      const response = await axiosInstance.post('/chat',data,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      const allMessages = messages 
      allMessages.push(response.data?.data)
      setMessages([
        ...allMessages
      ])
    }catch(exception){
      toast.error("error while seding msg",{description:"please try again...."})
    }
  }

  

  return (
    <>
      <div
        className="flex flex-col h-80 border rounded shadow-inner bg-gray-50 p-4 overflow-y-auto mb-4 gap-4"
      >

        <ChatMessageDetail messages = {messages} user ={user}/>

        <div ref={messagesEndRef} />
      </div>

        <SendMessage submitMessage={submitMessage} user={user}/>
    </>
  );
}