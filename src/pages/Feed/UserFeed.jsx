import React, { useEffect, useState } from "react";
import SingleFeed from "./SingleFeed";

const UserFeed = () => {
  const userId = localStorage.getItem("userID");
  const [posts, setposts] = useState();
  useEffect(() => {
    async function fetcher() {
      const response = await fetch(
        `http://localhost:8080/feed/posts/${userId}`
      );
      const awaitData = await response.json();

      if (!response.ok) {
        throw new Error("Not found");
      }
      setposts(awaitData.posts);
    }
    fetcher();
  }, [posts]);

  return (
    <section className="pt-10 mx-10">
      {!posts && <h1 className="text-4xl text-white">No posts yet !!</h1>}
    <ul className="grid gap-2 lg:grid-cols-3 list-none">
      {posts &&
        posts.map((post) => (
          <SingleFeed key={post._id} data = {post} isAuth = {true}/>
        ))}
    </ul>
    
    </section>
  );
};

export default UserFeed;
