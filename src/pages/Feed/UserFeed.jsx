import React, { useEffect, useState } from "react";
import SingleFeed from "./SingleFeed";

const UserFeed = ({user}) => {
  const [posts, setposts] = useState(user.posts);
  let userId = localStorage.getItem("userID");
  let isAuth;
    if (user._id === userId) {
      isAuth = true;
    } else {
      isAuth = false;
    }

  return (
    <section>
    <ul className="flex gap-2 flex-wrap list-none">
      {posts &&
        posts.map((post) => (
          <SingleFeed key={post._id} post = {post} creator = {user.name} isAuth = {isAuth}/>
        ))}
    </ul>
    
    </section>
   
  );
};

export default UserFeed;
