import { useState, type BaseSyntheticEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export const UserHeader = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false); // state for dropdown
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // toggle dropdown
  };

  return (
    <header className="bg-white px-6 py-4 shadow flex justify-end items-center">
      <span className="text-gray-600 font-medium">
        Welcome, {loggedInUser?.name || "Admin"}!
      </span>

      {loggedInUser?.image?.url && (
        <img
          src={loggedInUser.image.url}
          alt="avatar"
          className="w-8 h-8 rounded-full ml-3"
        />
      )}

      <div className="relative inline-flex ml-4">
        <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Product
          </button>

          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={toggleDropdown}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </span>

        {/* Dropdown */}
        {dropdownOpen && (
          <div
            role="menu"
            className="absolute end-0 top-12 z-10 w-56 overflow-hidden rounded border border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800"
          >
            <a
              href="#"
              className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
              role="menuitem"
            >
              Storefront
            </a>

            <a
              href="#"
              className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
              role="menuitem"
            >
              Warehouse
            </a>

            <a
              href="#"
              className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
              role="menuitem"
            >
              Stock
            </a>

            <li>
              <NavLink onClick={(e:BaseSyntheticEvent)=>{
                 e.preventDefault()
                 setLoggedInUser(undefined)
                 Cookies.remove('_at_57')
                 navigate('/')
              }} to ={`/${loggedInUser?.role}/me`} className="block w-full text-red-800">
                Logout
              </NavLink>
            </li>
          </div>
        )}
      </div>
    </header>
  );
};
