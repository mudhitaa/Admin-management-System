import { Router } from "express";
import Auth from "../middleware/Auth";
import ChatController from "../controllers/ChatController";
import { bodyvalidator } from "../middleware/Validator";
import z from "zod";
import uploader from "../middleware/Uploder";

const chatRouter = Router()
const chatCtrl = new ChatController();
const ChatDTO = z.object({
    receiver : z.string().nonempty("receiver is required"),
    message: z.string().min(1,"at least one character is required").max(2000,"Message too long"),
    file : z.file().optional()
})


//logged in user => different user chat list
chatRouter.get('/:userId',Auth(), chatCtrl.listAllChats)
chatRouter.post('/',Auth(),uploader().single('file'),bodyvalidator(ChatDTO), chatCtrl.createChat)
// logged in user => chat send
//chat react add router
//message delete edit api

export default  chatRouter