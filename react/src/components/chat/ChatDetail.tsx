import type { IUser } from "../../context/AuthContext"
import type { ISingleMessage } from "../../pages/users/UserMessage"
import { DateTime } from "luxon"

export interface IChatMessageDetailProps {
    messages: Array<ISingleMessage>,
    user: IUser
}


export default function ChatMessageDetail({messages,user}:Readonly<IChatMessageDetailProps>){
    return(<>
        {messages && messages.length > 0 ? messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              "flex items-start gap-2 " +
              (msg.receiver?._id !== user?._id ? "justify-start" : "justify-end")
            }
          >
            {msg.receiver?._id !== user?._id  && (
              <img
                src={msg.receiver?.image?.url}
                alt={msg.receiver?.name}
                className="w-10 h-10 rounded-full border shadow"
              />
            )}

            <div
              className={`flex flex-col ${
                msg.receiver?._id !== user?._id  ? "items-start" : "items-end"
              }`}
            >
              <span
                className={
                  "rounded-xl px-4 py-2 text-base max-w-xs wrap-break-words " +
                  (msg.receiver?._id === user?._id 
                    ? "bg-green-100 text-green-900"
                    : "bg-white text-gray-800 border")
                }
              >
                {msg.message}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                {msg.sender.name} · {
                  DateTime.fromJSDate(new Date(msg?.createdAt)).toRelative()
                 }
              </span>
            </div>

            {msg.receiver?._id === user?._id && (
              <img
                src={msg.sender?.image?.url}
                alt={msg.sender?.name}
                className="w-10 h-10 rounded-full border shadow"
              />
            )}
          </div>
        )):<></>}
    </>)
}