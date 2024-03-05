import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading' 
  const user = useLoaderData();
  
  let [categories] = useState({
    //in recent i will filter out the recent post by date
    Recent: user.posts,
    All: user.posts,
    
  });


  return (
    <>
      {isLoading ? <p>Loading</p> : (<>
      <header className="header bg-center h-80 bg-no-repeat bg-cover  bg-[url('https://www.solidbackgrounds.com/images/1584x396/1584x396-cadet-solid-color-background.jpg')] "/>
      <main className="main-grid flex flex-col justify-between ">
        <div className="left flex gap-2 justify-center items-center flex-col max-h-[600px]  bg-white ">
          <div className="photo-container block z-10">

            <img
              className="w-40 h-40 -mt-[80px] mx-auto border-4 border-white  rounded-full "
              src= {user.avatar ? user.avatar : "/user.png"}
              alt="user-avatar"
            />
          </div>
          <div className="user-details text-center ">
            <h1 className="text-4xl">{user.name}</h1>
            <p className="font-light text-gray-500 ">{user.status}</p>
            <p className="font-light text-gray-500">{user.email}</p>
          </div>
          <div className="divide-y divide-gray-100 py-5">
            <div className="blog-stats w-full flex flex-cols justify-evenly mb-5">
              <div className="text-center">
                <p className="text-2xl font-semibold">{user.posts.length}</p>
                <span className="text-gray-500">Blogs</span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">3</p>
                <span className="text-gray-500">Likes</span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">20</p>
                <span className="text-gray-500">Views</span>
              </div>
            </div>
            <div className="about-info py-3 text-center">
              <p className="w-2/3 mx-auto text-gray-500">
                {user.bio || "Edit your bio in edit profile section"}
              </p>
            </div>
            <div className="socials flex w-full justify-center items-center gap-4 pt-5">
              <span className="text-blue-500 text-3xl">
                <ion-icon name="logo-facebook"></ion-icon>
              </span>
              <span className="text-blue-500 text-3xl">
                <ion-icon name="logo-instagram"></ion-icon>
              </span>
              <span className="text-blue-500 text-3xl">
                <ion-icon name="logo-twitter"></ion-icon>
              </span>
            </div>
          </div>
        </div>

        <div className=" right p-2 m-4">
          <div className=" right-tab-panel w-full px-2  sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                        "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white text-blue-700 shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {Object.values(categories).map((posts, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    <ul>
                      {posts.map((post) => (
                        <li
                          key={post._id}
                          className="relative rounded-md p-3 hover:bg-gray-100"
                        >
                          <h3 className="text-sm font-medium leading-5">
                            {post.title}
                          </h3>

                          <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                            <li>{new Date(post.createdAt).toLocaleString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}</li>
                            {/* <li>{post.commentCount} comments</li>
                            <li>&middot;</li>
                            <li>{post.shareCount} shares</li> */}
                          </ul>

                          <a
                            href="#"
                            className={classNames(
                              "absolute inset-0 rounded-md",
                              "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                            )}
                          />
                        </li>
                      ))}
                    </ul>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </main>
      </>) }
    </>
  );
};

export default Profile;

// profile tab
// greet on login
// user photo upload
// user profile edit(bio,picture...)
// single post (user posts count and profile tab in profile)

// profile page (separate)
