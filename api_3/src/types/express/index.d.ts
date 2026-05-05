import { Iuser } from "../UserType";

declare global {
    namespace Express{
        interface Request{
            loggedInUser?:Iuser
        }
    }
}

export {};