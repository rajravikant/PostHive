import React, { useEffect, useState, Fragment } from "react";
import SingleFeed from "./SingleFeed";
import { TailSpin } from "react-loader-spinner";
import Modal from "../../components/UI/Modal";
import axios from "axios";


const AllFeed = () => {
  const [fetchedData, setFetchedData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  let error = { title: "Error", code: "404" };

 const closeModal = () =>{
    setIsOpen(false);
  }

  useEffect(() => {
    async function fetcher() {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/feed/posts?page=${page}`);
 
      if (response.status !== 200) {
        setIsOpen(true);
      }
      setFetchedData(response.data.posts);
      setTotalPages(response.data.totalDocs);
      setIsLoading(false);
    }
    fetcher();

  }, [page]);

 

  return (
    <>
     
      <section className="bg-white dark:bg-dark pt-2 w-[80%]">
        {/* {user.name && <p className="text-center text-white text-7xl transition ease-in-out delay-150 animate-pulse">{'Welcome '+user.name }</p>} */}

      

        {isOpen && (
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            title={error.title}
            type="error"
            message={`Some error occured : ${error.code}`}
          />
        )}

        {isLoading && (
          <div className="flex justify-center items-center">
            <TailSpin visible={true} height="80" color="#00ADB5" />
          </div>
        )}

        {fetchedData && (
          <div className="w-full  pb-5">
            <ul className="flex gap-5  flex-wrap list-none w-full items-start">
              {fetchedData.map((post) => (
                <SingleFeed key={post._id} post={post} creator = {post.creator.name} isAuth={false} />
              ))}
            </ul>
            {/* <Pagination/> */}
            <div className="flex flex-col items-center py-2">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{page}</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>{" "}
        
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <button  onClick={()=>setPage(prev => prev-1)}  disabled={page <= 1}   className="flex items-center justify-center disabled:bg-gray-500 px-3 h-8 text-sm font-medium text-white  bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">
          Prev
        </button>
        <button onClick={()=>setPage(prev => prev+1)} disabled={page >= totalPages}  className="flex items-center justify-center disabled:bg-gray-500 px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
        </button>
      </div>
    </div>
          </div>
        )}
      </section>
    </>
  );
};

export default AllFeed;
