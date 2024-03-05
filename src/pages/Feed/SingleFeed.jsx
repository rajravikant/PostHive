import React, { useState } from "react";
import { Link,useNavigate, useRouteLoaderData } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Modal from "../../components/UI/Modal";

const SingleFeed = (props) => {
  const token = useRouteLoaderData("root");
  const [isOpen, setIsOpen] = useState(false);
  const useN = useNavigate();
  function closeModal() {
      setIsOpen(false)
  }

  function onDelete(){
    const id = props.data._id.trim();
    console.log('deleteing');

    fetch(`http://localhost:8080/feed/post/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
    }).then((response)=>{
      if (!response.ok) {
        throw new Error('Error occured')
      }
      setIsOpen(false);
      useN('/')
    }).catch(err => {
      console.error(err);
    })    
  }

  const onDeleteHandler = () => {
    setIsOpen(true);
  };

  const date = new Date(props.data.createdAt).toLocaleString();
  return (
    <>
     
      {open && (
        <Modal
          isOpen={isOpen} onDelete = {onDelete}
          closeModal={closeModal}
          title="Delete Confirmation"
          type="confirm"
          message={`Do you want to delete this post`}
        />
      )}

      <li className="flex flex-col justify-between bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex p-2 justify-between items-center  text-gray-500">
          <span className="bg-blue-500 text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            {/* logo here */}
            Fitness
          </span>
          <span className="text-sm">{date}</span>
        </div>

        <div className="">
          <img
            src={props.data.imageUrl}
            className="h-[230px] w-full"
            alt={props.data._id}
          />
        </div>

        <h2 className="mb-2 text-2xl p-2 font-bold  text-gray-900 dark:text-white">
          <a href="#">{props.data.title}</a>
        </h2>

        <div className="flex justify-between p-2 items-center">
          <div className="flex items-center space-x-4">
            <span className="font-medium dark:text-white capitalize">
              {props.data.creator.name || "Unknown"}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              className="text-blue-400 uppercase inline-flex items-center font-medium hover:text-blue-500"
              to={`/post/${props.data._id}`}
            >
              Read
            </Link>
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
