import React from "react";
import { NavLink, useNavigate, useRouteLoaderData,Form, Link } from "react-router-dom";
import DropMenu from "../Dropdown/DropMenu";

// const navItems = [
//   { id: "feed", text: "Feed", link: "/",  },
//   { id: "login", text: "Login", link: "/login" },
//   { id: "signup", text: "Signup", link: "/signup"},
// ];

const Header = () => {
  const token = useRouteLoaderData("root");

  const useNavi = useNavigate();

  return (
    <nav tabIndex={-1} className="  sticky top-0 i font-pop z-40 w-full backdrop-blur flex flex-row justify-between items-center border-b  border-slate-300  py-2 dark:border-slate-900/10 bg-slate-900">
      <div className="px-5">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-violet-500" : "")}
        >
          <h3 className="text-white text-lg border-2 px-2 py-1">Blog App</h3>
        </NavLink>
        
      </div>

      <ul className="flex items-center flex-row justify-between   text-white text-lg px-5">
        
        <li  className="mx-3">
          <NavLink
            to="/" end
            className={({ isActive }) => (isActive ? "text-violet-500" : "hover:text-violet-400")}
          >
            Feed
          </NavLink>
        </li>
        {!token && (
          <li className="mx-3">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "text-violet-500" : "")}
            >
              Login
            </NavLink>
          </li>
        )}

        {token && (
          <>
         <li className="mx-3">
         <NavLink
              to="/my-posts"
              className={({ isActive }) => (isActive ? "text-violet-500" : "hover:text-violet-400")}
            >
              My Posts
            </NavLink>
         </li>
         <li className="mx-3">
         <NavLink
              to="/add-post"
              className={({ isActive }) => (isActive ? "text-violet-500" : "hover:text-violet-400")}
            >
              New Post
            </NavLink>
         </li>
           <li>
           <DropMenu/>
         </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
