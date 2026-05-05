import {  LuCircleDollarSign,  LuHouse, LuSettings, LuShoppingBag, LuUsers } from "react-icons/lu"
import { NavLink } from "react-router"
import { useAuth } from "../../hooks/useAuth"

export const UserSidebar =()=>{
  const {loggedInUser}= useAuth()
    return(
        <aside className=" hidden lg:w-64 bg-emerald-900 text-white lg:flex flex-col">
        <h2 className="text-xl font-bold p-5 border-b border-emerald-800">
          Admin Dashboard
        </h2>

        <nav className="p-4 space-y-2">
            <NavLink  to="/users" className="block px-4 py-2 rounded bg-emerald-800 flex flex-cols gap-2">            
              <LuHouse className="size-5"/>
              Dashboard
            </NavLink>

            <NavLink  to="/users/products" className="block px-4 py-2 rounded hover:bg-emerald-800 flex flex-cols gap-2">
              <LuShoppingBag className="size-5"/>
              Products
            </NavLink>
            {
              loggedInUser && loggedInUser.role==='admin'?<>
                <NavLink  to="/users/transactions" className="block px-4 py-2 rounded hover:bg-emerald-800 flex flex-cols gap-2">
                  <LuCircleDollarSign className="size-5"/>
                  Transaction
                </NavLink>
              </>:<>
              </>
              
            }

            <NavLink  to="/users/all-users" className="block px-4 py-2 rounded hover:bg-emerald-800 flex flex-cols gap-2">
              <LuUsers className="size-5"/>
              Users
            </NavLink>
            
            <NavLink  to="#"className="block px-4 py-2 rounded hover:bg-emerald-800 flex flex-cols gap-2">
              <LuSettings className="size-5"/>
               Settings
            </NavLink>
        </nav>
      </aside>
    )
}