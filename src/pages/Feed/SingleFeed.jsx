import React, { useState } from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Modal from "../../components/UI/Modal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

const SingleFeed = ({ post, creator, isAuth }) => {
  const token = useRouteLoaderData("root");
  const [isOpen, setIsOpen] = useState(false);
  const useN = useNavigate();

  function closeModal() {
    setIsOpen(false);
  }

  function onDelete() {
    const id = post._id.trim();
    axios
      .delete(`http://localhost:8080/feed/post/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (!response.ok) {
        }
        setIsOpen(false);
        useN("/profile");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const onDeleteHandler = () => {
    setIsOpen(true);
  };

  const createdDate = new Date(post.createdAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const lastUpdatedDate = new Date(post.updatedAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      {open && (
        <Modal
          isOpen={isOpen}
          onDelete={onDelete}
          closeModal={closeModal}
          title="Delete Confirmation"
          type="confirm"
          message={`Do you want to delete this post`}
        />
      )}

      <li className="magnetic-item min-h-[400px] w-[450px] flex flex-col  justify-start  rounded-md shadow-md cursor-pointer  dark:bg-dark dark:border-gray-700 border outline-none hover:border-0 hover:ring-2  hover:ring-primary  ">
        <Link to={`/post/${post._id}`}>
         
            <img
              src={`${import.meta.env.VITE_API_URI}/images/${post.imageUrl}`}
              className="h-[250px]  w-full object-cover rounded-t-md"
              alt={post.title}
            />
        </Link>
          <div className="content flex justify-between flex-col h-full mt-5 ">
            <div className="px-2">
              <div className="flex">
                <Link to={`/posts/${post.category}`}>
                  <span className="bg-primary/10 text-black  text-xs font-medium me-2 capitalize px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-primary border border-primary">
                    {post.category}
                  </span>
                </Link>

                {isAuth && (
                  <div className="flex items-center  gap-1">
                    <Link
                      className="text-blue-400 uppercase hover:text-blue-500"
                      to={`/post/edit/${post._id}`}
                    >
                      <PencilSquareIcon className="w-6 h-6" />
                    </Link>
                    <button
                      className="text-red-400 uppercase hover:text-red-500"
                      onClick={onDeleteHandler}
                    >
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
              <h2 className="text-2xl  font-bold  dark:text-zinc-200 ">
              {post.title}
            </h2>

            </div>

           
            <div className="p-2">
              <div className="inline-flex items-center gap-2 dark:text-gray-300 capitalize ">
                {!isAuth && <Link to={`/author/${post.creator._id}/profile`}>{'• '+creator || "Unknown"}</Link>}

                <span className="text-sm">{'• '+createdDate}</span>
                {isAuth && (
                  <span className="text-sm">Last Update : {lastUpdatedDate}</span>
                )}
              </div>
            </div>


          </div>

           
            {/* <p>{parse()}</p> */}
         

      </li>
    </>
  );
};

export default SingleFeed;
