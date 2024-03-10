import React, { useState, useRef, Fragment } from "react";
import {
  redirect,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import { Tab, Transition } from "@headlessui/react";
import { generateBase64FromImage } from "../../utils/imagePreview";
import Modal from "../../components/UI/Modal";
import UserFeed from "../Feed/UserFeed";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const user = useLoaderData();
  const token = useRouteLoaderData("root");
  const useN = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";

  const bioRef = useRef();
  const statusRef = useRef();
  const avatarRef = useRef();

  const [image, setImage] = useState({
    file: "",
    imgPreview: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  let avatar = "/user.png";
  if (user.avatar) {
    avatar = `http://localhost:8080/images/${user.avatar}`;
  }

  let categories = {
    //in recent i will filter out the recent post by date
    Recent: user.posts,
    All: user.posts,
  };

  const onAvatarHandler = () => {
    setIsOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('about',bioRef.current.value);
    // formData.append('status',statusRef.current.value);
    const data = {
      about: bioRef.current.value,
      status: statusRef.current.value,
    };
    fetch("http://localhost:8080/user/updateProfile", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status == "201") {
          setIsEditing(false);
          useN("/profile");
        }
      })
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    setImage({ imgPreview: "", file: "" });
    setIsOpen(false);
  };
  const onConfirm = async () => {
    const formData = new FormData();
    formData.append("avatar", image.file);
    axios
      .patch(`http://localhost:8080/user/upload/avatar`, formData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.status == "201") {
          setIsOpen(false);
          useN("/profile");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-20">
          <TailSpin visible={true} height="80" color="#00ADB5" />
        </div>
      ) : (
        <>
          {isOpen && (
            <Modal
              isOpen={isOpen}
              onConfirm={onConfirm}
              closeModal={closeModal}
              title="Select a file"
              type="upload"
              message={`Choose a file with .jpeg/png`}
            >
              <div className="container flex flex-col gap-3 items-center">
                <form>
                  <input
                    hidden
                    name="avatar"
                    onChange={(e) => {
                      generateBase64FromImage(e.target.files[0])
                        .then((b64) => {
                          setImage({
                            file: e.target.files[0],
                            imgPreview: b64,
                          });
                        })
                        .catch((e) => {
                          setImage(null);
                        });
                    }}
                    type="file"
                    ref={avatarRef}
                    accept="image/png, image/jpeg"
                  />

                  <div className="mt-2">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={(e) => avatarRef.current.click()}
                    >
                      Choose
                    </button>
                  </div>
                </form>
                <div className="preview w-full ">
                  <img src={image.imgPreview} className="h-[20rem] mx-auto" />
                </div>
              </div>
            </Modal>
          )}

          <main className="main-grid flex justify-between">
            <div className="flex gap-2 justify-center items-center flex-col p-2 m-5 rounded-lg bg-white dark:bg-dark border dark:border-gray-700 shadow-lg min-w-[300px] ">
              <div className="photo-container block relative">
                <img
                  className="w-40 h-40  mx-auto border-4 border-white dark:border-primary  rounded-full "
                  src={avatar}
                  alt="user-avatar"
                />
                <div
                  onClick={onAvatarHandler}
                  className=" absolute bottom-2 right-2 bg-primary rounded-full h-9 w-9 grid place-items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[20px] h-[20px] text-white "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>
              <div className="user-details text-center text-gray-500 dark:text-[#EEEEEE] ">
                <h1 className="text-4xl font-semibold capitalize">{user.name}</h1>
                <p className="font-light  ">{user.status}</p>
                <p className="font-light">{user.email}</p>
              </div>
              <div className="divide-y divide-gray-300 dark:divide-gray-700 py-5">
                <div className="blog-stats w-full gap-5 flex flex-cols justify-evenly mb-5 dark:text-[#EEEEEE]">
                  <div className="text-center">
                    <p className="text-2xl font-semibold">
                      {user.posts.length}
                    </p>
                    <span className="text-gray-500 ">Blogs</span>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold">3</p>
                    <span className="text-gray-500 ">Likes</span>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold">20</p>
                    <span className="text-gray-500 ">Views</span>
                  </div>
                </div>
                <div className="about-info py-3 text-center">
                  <p className="w-2/3 mx-auto text-gray-500 dark:text-[#EEEEEE]">
                    {user.bio || "Edit your bio in edit profile section"}
                  </p>
                </div>
                <div className="socials flex w-full justify-center items-center gap-4 pt-5">
                  <span className="text-primary text-3xl">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </span>
                  <span className="text-primary text-3xl">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </span>
                  <span className="text-primary text-3xl">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </span>
                </div>
              </div>
              <div className="editing">
                <button
                  className="btn-primary"
                  onClick={() => setIsEditing((prev) => !prev)}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <Transition show={isEditing} as={Fragment}>
              <Transition.Child
                as={Fragment}
                enter="ease-in duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="p-10 m-5 h-[500px] rounded-lg dark:bg-dark shadow-md ">
                  <form onSubmit={handleFormSubmit}>
                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-[#fff]">
                      Update Profile
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-zinc-300">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>

                    <div className="mt-10 flex flex-col gap-4">
                      <textarea
                        id="about" 
                        ref={bioRef}
                        placeholder="Write a few sentences about yourself."
                        name="about"
                        className="inputs"
                        defaultValue={user.bio || ""}
                      />

                      <input
                        type="text"
                        placeholder="how is your mood"
                        name="status"
                        ref={statusRef}
                        defaultValue={user.status || ""}
                        className="inputs"
                      />

                      <input
                        type="text"
                        placeholder="facebook profile url"
                        name="fblink"
                        className="inputs"
                      />

                      <input
                        type="text"
                        placeholder="instagram profile url"
                        name="fblink"
                        className="inputs"
                      />

                      <input
                        type="text"
                        placeholder="twitter x profile url"
                        name="fblink"
                        className="inputs"
                      />

                      <div className=" flex  gap-1 items-center justify-end">
                        <button
                          type="submit"
                          className="btn-primary"
                        >
                          {isSubmitting ? "Updating" : "Update"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </Transition>

            {!isEditing && user.posts.length > 0 && <UserFeed user={user} />}

            {user.posts.length <= 0 && (
              <h1 className="m-5 text-4xl text-zinc-300">No Posts Yet!</h1>
            )}
            <div className="right  m-5 min-w-[250px] ">
              <div className=" right-tab-panel w-full ">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-dark p-1">
                    {Object.keys(categories).map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium ",
                            "  focus:outline-none",
                            selected
                              ? "bg-white text-primary shadow"
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
                                <li>
                                  {new Date(post.createdAt).toLocaleString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </li>
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
        </>
      )}
    </>
  );
};

export default Profile;
