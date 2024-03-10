import React, { useState } from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Modal from "../../components/UI/Modal";

const SingleFeed = (props) => {
  const token = useRouteLoaderData("root");
  const [isOpen, setIsOpen] = useState(false);
  const useN = useNavigate();
  function closeModal() {
    setIsOpen(false);
  }

  function onDelete() {
    const id = props.data._id.trim();
    fetch(`http://localhost:8080/feed/post/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occured");
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

  const createdDate = new Date(props.data.createdAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const lastUpdatedDate = new Date(props.data.updatedAt).toLocaleString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
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

      <li className="flex flex-col space-y-2 rounded-md shadow-md cursor-pointer  dark:bg-dark dark:border-gray-700 border outline-none hover:border-0 hover:ring-2  hover:ring-primary hover:scale-[1.02] transition duration-200 ease-linear ">
        <Link to={`/post/${props.data._id}`}>
          <div>
            <img
              src={props.data.imageUrl}
              className="h-[200px] w-full object-center rounded-t-md"
              alt={props.data._id}
            />
          </div>
        </Link>
        <div className=" flex gap-2 px-2">
          <span className="bg-red-500 text-white text-xs inline-flex items-center px-2.5 py-0.5 rounded ">
            Trending
          </span>
          <span className="bg-green-500 text-white text-xs inline-flex items-center px-2.5 py-0.5 rounded ">
            Tech
          </span>
          <span className="bg-primary text-white text-xs inline-flex items-center px-2.5 py-0.5 rounded ">
            Web
          </span>
        </div>

        <div className="p-2">
          <h2 className=" text-2xl  font-bold  dark:text-zinc-200 ">
            {props.data.title}
          </h2>

          <p className=" text-sm  font-light text-left  dark:text-gray-400">
            {props.data.content.slice(0, 80)}...
          </p>
        </div>

        <div className="flex justify-between items-center p-2">
          <div className="flex flex-col dark:text-gray-300 capitalize ">
            {!props.isAuth && (
              <span>Creator : {props.creator || "Unknown"}</span>
            )}

            <span className="text-sm">Posted on : {createdDate}</span>
            {props.isAuth && (
              <span className="text-sm">Last Update : {lastUpdatedDate}</span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {props.isAuth && (
              <>
                <Link
                  className="text-blue-400 uppercase hover:text-blue-500"
                  to={`/post/edit/${props.data._id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Link>
                <button
                  className="text-red-400 uppercase hover:text-red-500"
                  onClick={onDeleteHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default SingleFeed;
