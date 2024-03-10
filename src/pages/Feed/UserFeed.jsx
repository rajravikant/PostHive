import React, { useEffect, useState } from "react";
import SingleFeed from "./SingleFeed";

const UserFeed = ({user}) => {

  const [posts, setposts] = useState(user.posts);

  return (
    <section className="p-5 ">
    <ul className="grid grid-cols-2 gap-7 list-none">
      {posts &&
        posts.map((post) => (
          <SingleFeed key={post._id} data = {post} creator = {user.name} isAuth = {true}/>
        ))}
    </ul>
    
    </section>
   
  );
};

export default UserFeed;
