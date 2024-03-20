import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const HotPicks = () => {
    const [fetchedData, setFetchedData] = useState();
    useEffect(()=>{
        async function fetcher() {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/feed/posts?page=1`);
            if (response.status !== 200) {
              error = { title: awaitData.message, code: response.status };
            }
            setFetchedData(response.data.posts);
          }
          fetcher();
    },[])
  return (
    <>
        <h2 className="text-lg tracking-tight font-medium mb-2 text-gray-900 dark:text-white">Hot Picks</h2>
              <ul className="flex flex-col gap-5 overflow-y-hidden">
                
                {fetchedData && fetchedData.map((post,index) =>  <li key={index} className="space-y-2">
                    <span className="bg-primary/10 text-black  text-xs font-medium me-2 px-2.5 py-0.5 capitalize rounded dark:bg-gray-700 dark:text-primary border border-primary">
                    {post.category}
                  </span>
                    <p className="text-sm">{post.title}</p>
                  <Link to={`/post/${post._id}`}>
                    <span className="text-sm text-blue-300">Read Now ➡️</span>
                  </Link>
                </li>) }
                
              </ul>
    </>
  )
}

export default HotPicks