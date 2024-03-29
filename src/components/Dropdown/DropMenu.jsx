import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  UserCircleIcon,
  PowerIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

import { Link, Form } from "react-router-dom";


export default function DropMenu() {
  const userId = localStorage.getItem('userID')
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center rounded-full  px-2 py-2 gap-1  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <img
            className="h-8 w-8 rounded-full transition ease-in-out hover:scale-125 duration-200 object-cover"
            src={'./user.png'}
            alt="./user.png"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-300/20 rounded-md bg-white dark:bg-dark  shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/author/${userId}/profile`}
                  className={`${
                    active
                      ? "bg-[#00ADB5] text-white"
                      : "text-gray-900 dark:text-[#EEEEEE]"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <UserCircleIcon className="mr-2 w-5 h-5" />
                  My Profile
                </Link>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/add-post"
                  className={`${
                    active
                      ? "bg-[#00ADB5] text-white"
                      : "text-gray-900 dark:text-[#EEEEEE]"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <PencilIcon className="mr-2 w-5 h-5" />
                  Add Post
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className={`${
                      active
                        ? "bg-[#00ADB5] text-white"
                        : "text-gray-900 dark:text-[#EEEEEE]"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <PowerIcon className="mr-2 w-5 h-5" />
                    Logout
                  </button>
                </Form>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
