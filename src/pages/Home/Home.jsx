import React from "react";
import AllFeed from "../Feed/AllFeed";
import CategoryList from "../../components/Category/CategoryList";
import HotPicks from "../../components/HotPicks/HotPicks";
import LatestBlogs from "../../components/Latest/LatestBlogs";

const Home = () => {
  return (
    <section className="max-w-screen-xl mx-auto pt-10 px-5">
      <div className="lg:mb-16 mb-8">
        <h2 className="mb-4 text-3xl lg:text-6xl  text-gray-900 dark:text-white">
          <span className="font-bold">Hey ya,</span> Welcome to PostHive Blogs
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          We use an agile approach to test assumptions and connect with the
          needs of your audience early and often.
        </p>
      </div>

      <LatestBlogs/>
    

      <div className="popular">
        <h1 className="mb-4 text-3xl tracking-tight font-normal text-gray-900 dark:text-white">
          Popular Categories
        </h1>
        <CategoryList />
      </div>

      <div className="main-feed">
        <h1 className="mt-5 mb-3 text-3xl tracking-tight font-normal text-gray-900 dark:text-white">Recent Posts</h1>
        <div className="flex  items-start w-full justify-between">
          <AllFeed />
          <div className="popular w-[20%] px-2 ">
            <HotPicks/>
          </div>
        </div>
      </div>

      

      
    </section>
  );
};

export default Home;
