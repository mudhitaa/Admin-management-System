import { useState, type BaseSyntheticEvent } from "react"
import type { IMessageType } from "../user/UserMessage"
import type { IUser } from "../../context/AuthContext"
import socket from "../../config/socket"
import { useAuth } from "../../hooks/useAuth"

export interface ISendMessageProps{
    submitMessage:(data:IMessageType)=>void
    user:IUser
}

export default function SendMessage ({submitMessage,user}:Readonly<ISendMessageProps>){
    const [message,setMessage] = useState<string>("")
    const {loggedInUser}= useAuth()


    const handleSubmit=(e:BaseSyntheticEvent)=>{
        e.preventDefault()
        submitMessage({
            receiver:user._id,
            message:message,
        })
        setMessage("")

        //notify to socket
        socket.emit("messageSent",{sender:loggedInUser?._id, receiver: user?._id})

    } 
    return(<>
        <form
        className="flex gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={message}
          onChange={(e:BaseSyntheticEvent)=> setMessage(e.target.value)}
          placeholder="Type your message ..."
          className="flex-1 border rounded px-4 py-2 focus:outline-none"
        />
        <button
          className="bg-green-900 text-white rounded px-6 py-2 font-bold cursor-not-allowed"
          type="submit"
        >
          send
        </button>
      </form>
    </>)
}