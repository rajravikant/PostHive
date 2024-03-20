import React from "react";
import { Link } from "react-router-dom";
const FeautredBlog = ({data}) => {
 
  return (
    <li className="flex gap-5 cursor-pointer  dark:bg-dark ">
      <img
        src={`${
          import.meta.env.VITE_API_URI
        }/images/${data.imageUrl}`}
        className="h-[300px]  object-cover "
        alt={"dasd"}
      />

      <div className="px-2 content items-start flex justify-between flex-col overflow-hidden">
        <div>
          <span className="bg-primary/10 text-black capitalize  text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-primary border border-primary">
            {data.category}
          </span>
          <h2 className="mt-2 text-2xl dark:text-zinc-200 text-gray-900 ">
            {data.title}
          </h2>

          <p className="text-gray-500 dark:text-zinc-400 text-justify mt-2">
            {data.content.slice(0,400)}
          </p>
        </div>

        <Link to={`post/${data._id}`} type="button" className="text-md text-primary">Read More ➡️</Link>
      </div>
    </li>
  );
};

export default FeautredBlog;
