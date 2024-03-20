import React,{useEffect,useState} from 'react'
import axios from 'axios'
import FeautredBlog from "./FeautredBlog";
const LatestBlogs = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URI}/feed/posts/latest`).then(post =>{
      setPosts(post.data.posts);
    }).catch(err => console.log(err))
  },[])
  return (
    <div className="featured my-7">
    <h1 className="mb-4 text-3xl tracking-tight font-normal text-gray-900 dark:text-white">
      Latest Blogs
    </h1>
    <ul className="flex w-full flex-col gap-5">
      {posts.map(post => <FeautredBlog data = {post}/>)}
    </ul>
  </div>
  )
}

export default LatestBlogs