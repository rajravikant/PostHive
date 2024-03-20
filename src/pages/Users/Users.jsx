import React from "react";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const users = useLoaderData();

  return (
    <section className="pt-5 px-10 w-lg ">
      <ul className="flex items-center gap-2 w-full ">
        {users.map((user) => (
         <Link to={`/author/${user._id}/profile`}key={user._id} >
           <li className="p-2 cursor-pointer gap-2 flex items-center rounded-md bg-white dark:bg-dark border dark:border-gray-700 shadow-lg dark:hover:bg-blue-300/50 dark:text-[#EEEEEE]">
            <img
              className="h-36 w-36 object-cover rounded-full"
              src={user.avatar ? `${import.meta.env.VITE_API_URI}/images/${user.avatar}` : "/user.png"}
              alt="ico"
            />
            <div>
              <h1 className="text-xl capitalize ">{user.name}</h1>
              <p className="font-semibold">{user.bio}</p>
              <p className="italic">{user.status}</p>
              <p className="italic">{user.posts.length}</p>
              <p className="italic">
                Joined :{new Date(user.createdAt).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </li>
         </Link>
        ))}
      </ul>
    </section>
  );
};

export default Users;

export async function loader() {
  const response = await axios.get(`${import.meta.env.VITE_API_URI}/allUsers`);

  if (response.status !== 200) {
    console.log(response.data);
    return response;
  }
  return response.data.users;
}
