import React, { useEffect, useState, Fragment } from "react";
import SingleFeed from "./SingleFeed";
import { TailSpin } from "react-loader-spinner";
import Modal from "../../components/UI/Modal";
import { useRouteLoaderData } from "react-router-dom";

const AllFeed = () => {
  const [fetchedData, setFetchedData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  let error = { title: "Error", code: "404" };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    async function fetcher() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/feed/posts");
      const awaitData = await response.json();
      if (!response.ok) {
        error = { title: awaitData.message, code: response.status };
        setIsOpen(true);
      }
      setFetchedData(awaitData.posts);
    }
    fetcher();

    setIsLoading(false);
  }, []);

  const header = [
    { id: 1, title: "All" },
    { id: 2, title: "Sports" },
    { id: 3, title: "Fitness" },
    { id: 4, title: "Food" },
    { id: 6, title: "Adventure" },
  ];

  return (
    <>
      <header
        className="fixed  start-0 bg-gray-800 w-full border-b border-slate-300/10"
        tabIndex={1}
      >
        <ul className="flex justify-center gap-10  text-white py-3">
          {header.map((item) => (
            <li
              className="cursor-pointer hover:bg-violet-500 transition-all duration-200 hover:py-1 hover:px-2 hover:rounded-sm  "
              key={item.id}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </header>
      <section className="bg-white dark:bg-gray-900 pt-20">
        {/* {user.name && <p className="text-center text-white text-7xl transition ease-in-out delay-150 animate-pulse">{'Welcome '+user.name }</p>} */}

        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-6xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Blog
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>

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
          <div className="flex justify-center mt-20">
            <TailSpin visible={true} height="80" />
          </div>
        )}

        {fetchedData && (
          <div className="py-8 px-40 mx-auto">
            <ul className="grid gap-2 lg:grid-cols-3 list-none">
              {fetchedData.map((post) => (
                <SingleFeed key={post._id} data={post} isAuth={false} />
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default AllFeed;