import React, {useRef, useState } from "react";
import { useRouteLoaderData, Link,useNavigate, useLoaderData,useNavigation } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";


import parse from "html-react-parser";
import Comment from "../../components/Comments/Comment";

const SinglePost = () => {
  const post = useLoaderData();
  const [commentState, setCommentState] = useState(false);
  const token = useRouteLoaderData("root");
  const commentRef = useRef();
  const naviagte = useNavigate();
  const  navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  let userId = localStorage.getItem("userID");

  let isAuth;
    if (post.creator._id === userId) {
      isAuth = true;
    } else {
      isAuth = false;
    }

  
 
  
 

  const commentDeleteHandler = (id)=>{
    const cmtId = id;

    const response = axios.patch(
      `${import.meta.env.VITE_API_URI}/feed/post/${post._id}/comment/delete`,{cmtId},
      {
        headers: { Authorization: "Bearer " + token },
      }
    ).then(res =>{
      if (res.status === 200) {
        naviagte(0);
      }
    });
    toast.promise(response, {
      loading: "deleting",
      success: "Deleted Successfully!",
      error: "Error while deleting",
    });
  }



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", commentRef.current.value);

    const fetcher = axios.post(
      `${import.meta.env.VITE_API_URI}/feed/post/${post._id}/comment/`,
      formData,
      {
        headers: { Authorization: "Bearer " + token },
      }
    ).then(()=>naviagte(0)).catch((err) => console.error(err))
    
    
    toast.promise(fetcher, {
      loading: "posting",
      success: "comment added",
      error: "Error while adding comment",
    });
  };

  return (
    <section className="w-full py-5">
      {isLoading && <FallingLines visible={true} height="40" color="#00ADB5" />}
      {post && (
        <>
          <Toaster />
          <Link
            to="/"
            className="flex justify-center divide-x text-xl bg-darkL w-fit mx-auto p-1 rounded-full gap-2  items-center divide-gray-500/30 text-blue-400 hover:text-blue-600 "
          >
            <ArrowLeftIcon className="h-5 w-5 " />
            <h1 className="px-2">All Blogs</h1>
          </Link>
          <div className="flex w-full mt-2 justify-center">
            <article className="lg:w-[80%]  lg:px-10 px-5">
              <header className=" lg:mb-6 not-format text-center">
                <h1 className=" text-3xl font-extrabold  text-gray-900  lg:text-4xl dark:text-white">
                  {post.title}
                </h1>
                <address>
                  <div className=" text-[#393E46] dark:text-white">
                    <div className="flex justify-center gap-1 ">
                      <div>
                        <span>Published by </span>
                        <Link
                          to={`/author/${post.creator._id}/profile`}
                          className="text-black font-bold dark:text-white"
                        >
                          {post.creator.name || "Unknown"}
                        </Link>
                        <span> at </span>
                        <time>
                          {new Date(post.createdAt).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <div>
                        {isAuth &&(
                          <Link
                            className="text-blue-400 uppercase hover:text-blue-500"
                            to={`/post/edit/${post._id}`}
                          >
                            <PencilSquareIcon className="h-6 w-6" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </address>
              </header>

              <figure className="mt-5">
                <img
                  src={`${import.meta.env.VITE_API_URI}/images/${post.imageUrl}`}
                  alt="blog-article"
                  className=" object-cover  h-[400px] mx-auto"
                />
              </figure>

              <div className="mt-3 dark:text-[#EEEEEE] [&_a]:underline [&_a]:font-medium  [&_h1]:font-semibold [&_h1]:text-2xl [&_h2]:font-semibold [&_h2]:text-xl  ">
                {parse(post.content)}
              </div>

              <div className="comments  bg-white rounded-md dark:bg-dark border dark:border-gray-700 shadow-lg">
                <form onSubmit={onSubmitHandler}>
                  <div className="px-4 py-2 space-y-2  ">
                    {token ? (
                      <input
                        type="text"
                        name="comment"
                        ref={commentRef}
                        placeholder="Add a comment"
                        className="inputs"
                        onClick={() => {
                          setCommentState(true);
                        }}
                      />
                    ) : (
                      <Link to="/login">
                      <button className="btn-primary mx-auto" type="button">
                        Login to add comment
                      </button>
                      </Link>
                    )}
                    {commentState && (
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setCommentState(false)}
                          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white dark:bg-dark rounded-2xl  dark:hover:bg-darkL"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-400 rounded-2xl   hover:bg-blue-500"
                        >
                          Comment
                        </button>
                      </div>
                    )}
                  </div>
                </form>

                <div className="comments">
                  <ul className="flex flex-col divide-y px-4 divide-gray-300 dark:divide-gray-700  w-full ">
                    {post.comments.length <= 0 && <h1 className="dark:text-white">No comments yet..</h1>}
                    
                    {post.comments.map((comment) => (
                      <Comment onDelete ={commentDeleteHandler}
                        key={comment._id} postId={post._id}
                        comment={comment}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </>
      )}
    </section>
  );
};

export default SinglePost;


export async function loader({ request, params }) {
  const pId = params.postId;
  const response = await axios.get(`${import.meta.env.VITE_API_URI}/feed/post/${pId}`);
  return response.data.post;
}