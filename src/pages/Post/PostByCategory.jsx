import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import SingleFeed from "../Feed/SingleFeed";
const PostByCategory = () => {
  const loaderData = useLoaderData();

  return (
    <section className="max-w-screen-xl mx-auto pt-10 px-5 flex gap-1">
      {loaderData.data ? (
        loaderData.data.posts.map((post, index) => (
          <SingleFeed creator={"Admin"} post={post} key={index} />
        ))
      ) : (
        <h1 className="text-6xl mx-auto dark:text-[#EEE]">No related post found 🤦‍♂️🤦‍♂️</h1>
      )}
    </section>
  );
};

export default PostByCategory;

export async function loader({ request, params }) {
  let category = params.category;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URI}/feed/posts?category=${category}`
    );
    if (response.status !== 200) {
      return response;
    }
    return response;
  } catch (error) {
    return error;
  }
}
