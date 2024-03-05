import React, { useEffect, useState } from "react";
import { useParams,useRouteLoaderData } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
const SinglePost = () => {
  const parmas = useParams();
  const [post, setPost] = useState();
  const [isLoading,setIsLoading] = useState(true);
  const token = useRouteLoaderData("root");

  useEffect(() => {
    fetch(`http://localhost:8080/feed/post/${parmas.postId}`)
      .then((result) => {
        return result.json();
      })
      .then((fetchedPost) => {
        setPost(fetchedPost.post);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-center items-center mx-auto ">
    {isLoading && <FallingLines visible={true} height="40"/> }
      {post && (
        <article className="mx-auto max-w-2xl dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {post.creator.name || 'Unknown'}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    Graphic Designer, educator & CEO Flowbite
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time>
                      {new Date(post.createdAt).toLocaleString()}
                    </time>
                  </p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {post.title}
            </h1>
          </header>
         
          <figure>
            <img src={post.imageUrl} alt="blog-article"/>
            <figcaption className="text-center text-white font-thin">{post.title}</figcaption>
          </figure>
          <p className="text-white">{post.content}</p>
        </article>
      )}
    </div>
  );
};

export default SinglePost;
