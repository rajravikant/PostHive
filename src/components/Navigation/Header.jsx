import React, { useEffect, useState } from "react";
import {
  NavLink,
  useRouteLoaderData,
} from "react-router-dom";
import DropMenu from "../Dropdown/DropMenu";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";


const Header = () => {
  const token = useRouteLoaderData("root");
  const [mode, setMode] = useState("light");

  const toggleTheme = ()=>{
    if(document.body.classList.contains("light")){
      document.body.classList.remove("light")
      document.body.classList.add("dark")
    }else{
      document.body.classList.add("light")
      document.body.classList.remove("dark")
    }
  }

  const themeChangeHandler = () => {
    setMode((prev) => {
      if (prev === "dark") {
        return "light";
      } else {
        return "dark";
      }
    });
  };


  useEffect(()=>{
    toggleTheme();
  },[mode])

  return (
    <nav
      tabIndex={-1}
      className=" bg-white sticky top-0  font-pop z-40 w-full backdrop-blur flex flex-row lg:justify-between justify-center  items-center border-b  border-slate-300  py-2 dark:border-slate-900/10 dark:bg-darkL "
    >
      <div className="px-5">
        <NavLink to="/">
          <div className="logo  transition hover:scale-[1.1]  ease-in-out duration-300  bg-gradient-to-r from-blue-500 to-primary px-2">
            <h3 className="text-white text-lg">PostHive</h3>
          </div>
        </NavLink>
      </div>

      <ul className="flex items-center  text-white text-lg px-5">
        <li>
          <button
            onClick={themeChangeHandler}
            type="button"
            className="text-primary  hover:bg-gray-100 dark:hover:bg-dark/60  rounded-lg text-sm p-2.5 inline-flex items-center justify-center"
          >
            {mode === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </li>
        <li className="mx-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-primary " : "text-[#393E46] dark:text-[#EEEEEE]"
            }
          >
            Blogs
          </NavLink>
        </li>
        <li className="mx-3">
          <NavLink
            to="/authors"
            className={({ isActive }) =>
              isActive ? "text-primary " : "text-[#393E46] dark:text-[#EEEEEE]"
            }
          >
            Authors
          </NavLink>
        </li>
        {!token && (
          <li className="mx-3">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "text-primary" : "text-[#393E46] dark:text-[#EEEEEE]")}
            >
              Login
            </NavLink>
          </li>
        )}

        {token && (
          <>
            <li className="mx-3">
              <NavLink
                to="/add-post"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-[#393E46] dark:text-[#EEEEEE]"
                }
              >
                New Post
              </NavLink>
            </li>
            <li>
              <DropMenu />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
