import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import { useRouteLoaderData ,useNavigate, Link} from "react-router-dom";

const Comment = ({ comment, postId,onDelete }) => {
  let userId = localStorage.getItem("userID");
  const token = useRouteLoaderData('root');
  const naviagte = useNavigate()
  let isAuth;
  if (!userId) {
    isAuth = false;
  } else {
    if (comment.user._id === userId) {
      isAuth = true;
    } else {
      isAuth = false;
    }
  }

  let avatar = '/user.png'
  if (comment.user.avatar) {
    avatar = `${import.meta.env.VITE_API_URI}/images/${comment.user.avatar}` 
  }

  

  return (
    <li className="p-2 gap-4 flex dark:text-[#EEEEEE]">
      <Toaster />
      <img
        className="h-10 w-10 object-cover bg-center rounded-full"
        src={ avatar} 
        // src="/user.png"
        alt="ico"
      />
      <div className="right">
        <div className="flex gap-1 items-center">
          <Link to={`/author/${comment.user._id}/profile`}>
          <h1 className="text-md font-semibold capitalize ">
            {comment.user.name}
          </h1>
          </Link>
          <span className="italic text-xs">
            {moment(comment.commentedAt).fromNow()}
          </span>
          {isAuth && (
            <button
              type="button"
              className="mx-2 text-red-500 text-xs "
              onClick={()=>onDelete(comment._id)}
            >
              Remove
            </button>
          )}
        </div>
        <p className="text-sm">{comment.comment}</p>
      </div>
    </li>
  );
};

export default Comment;
