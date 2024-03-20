import React,{useState} from "react";

const Pagination = () => {
  
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col items-center py-2">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{page}</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>{" "}
        
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Prev
        </button>
        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
