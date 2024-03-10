import React, { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
const SinglePost = () => {
  const parmas = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData("root");

  useEffect(() => {
    fetch(`http://localhost:8080/feed/post/${parmas.postId}`)
      .then((result) => {
        return result.json();
      })
      .then((fetchedPost) => {
        setPost(fetchedPost.post);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-center items-center mx-auto ">
      {isLoading && <FallingLines visible={true} height="40" color="#00ADB5" />}
      {post && (
        <article className="mx-auto max-w-4xl mt-5 ">
          <header className=" lg:mb-6 not-format">
            <h1 className=" text-3xl font-extrabold leading-tight text-gray-900  lg:text-4xl dark:text-white">
              {post.title}
            </h1>
            <address className="flex items-center ">
              <div className="inline-flex items-center  text-[#393E46] dark:text-white">
                <div>
                  <span>Published by </span>
                  <a href="#" className="text-black font-bold dark:text-white">
                    {post.creator.name || "Unknown"}
                  </a>
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
              </div>
            </address>
          </header>

          <figure>
            <img src={post.imageUrl} alt="blog-article" />
            <figcaption className="text-center text-gray-900 dark:text-white ">
              {post.title}
            </figcaption>
          </figure>
          <p className="dark:text-white pt-5">{post.content}</p>
        </article>
      )}
    </div>
  );
};

export default SinglePost;
