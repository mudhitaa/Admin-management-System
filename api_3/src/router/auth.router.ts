import { Router } from "express"
import AuthController from "../controllers/AuthController"
import { IAuthController } from "../types/authTypes"
import uploder from "../middleware/Uploder"
import {bodyvalidator} from "../middleware/Validator"
import { UserRegisterSchema, UserLoginSchema, UserProfileSchema } from "../validation-schema/AuthSchema"
import Auth from "../middleware/Auth"

const authrouter=Router()
const authCtrl : IAuthController= new AuthController()



//routing path declare
authrouter.post("/login",bodyvalidator(UserLoginSchema),authCtrl.userlogin)

authrouter.post("/register", uploder().single("image"), bodyvalidator(UserRegisterSchema), authCtrl.userregister)

authrouter.get("/me",Auth(), authCtrl.getLoggedInUserProfile)

authrouter.put("/:userId",Auth(),uploder().single("image"),bodyvalidator(UserProfileSchema), authCtrl.updateMyProfile)

authrouter.delete("/:userId",Auth(['admin']),authCtrl.deleteUser)

authrouter.get("/all-users",Auth(),authCtrl.getAllUsers)

authrouter.get("/:userId/detail",Auth(),authCtrl.getUserById)


export default authrouter;





//authrouter.post("/register", uploder().none(), authCtrl.userregister)
//authrouter.post("/register", uploder().array("image"), authCtrl.userregister)
//authrouter.post("/register", uploder().fields("image"), authCtrl.userregister)

//authRouter.post("/register", uploder().fields([
// {name:"image", maxCount:1},
// {name:"gallary", maxCount:10}
// ]), authCtrl.userregister)