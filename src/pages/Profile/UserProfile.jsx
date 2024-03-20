import React,{useState,useRef} from "react";
import axios from "axios";
import { useLoaderData,useNavigate,useRouteLoaderData,useNavigation } from "react-router-dom";
import UserFeed from "../Feed/UserFeed";
import { PencilIcon } from "@heroicons/react/24/outline";
import Modal from "../../components/UI/Modal";
import { generateBase64FromImage } from "../../utils/imagePreview";


const UserProfile = () => {
  const user = useLoaderData();
  let userId = localStorage.getItem("userID");
  const token = useRouteLoaderData("root");


  let isAuth;
  if (!userId) {
    isAuth = false;
  } else {
    if (user._id === userId) {
      isAuth = true;
    } else {
      isAuth = false;
    }
  }
  let avatar = "/user.png";
  if (user.avatar) {
    avatar = `http://localhost:8080/images/${user.avatar}`;
  }


  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState({
    file: "",
    imgPreview: "",
  });
  
  const bioRef = useRef();
  const statusRef = useRef();
  const avatarRef = useRef();
  const navigate = useNavigate();

  const onAvatarHandler = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setImage({ imgPreview: "", file: "" });
    setIsOpen(false);
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
          navigate(0);
        }
      })
      .catch((err) => console.log(err));

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
          navigate(0);
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <section className="w-full flex  lg:justify-start  justify-center items-start">

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

      <div className="w-[20%]">
        {!isEditing ? (
          <div className="flex  gap-2 justify-center items-center flex-col p-5 m-2 bg-white dark:bg-dark border dark:border-gray-700 shadow-md ">
            <div className="photo-container block relative">
              <img
                className="w-40 h-40 object-cover  mx-auto border-4 border-white dark:border-primary  rounded-full "
                src={avatar}
                alt="user-avatar"
              />
              {isAuth && (
                <div onClick={onAvatarHandler}   className=" absolute bottom-2 right-2 bg-primary rounded-full h-9 w-9 grid place-items-center cursor-pointer">
                  <PencilIcon className="w-[20px] h-[20px] text-white" />
                </div>
              )}
            </div>
            <div className="user-details text-center text-gray-500 dark:text-[#EEEEEE] ">
              <h1 className="text-4xl font-semibold capitalize">{user.name}</h1>
              <p className="font-light  ">{user.status}</p>
            </div>
            <div className="divide-y divide-gray-300 dark:divide-gray-700 py-5">
              <div className="blog-stats w-full gap-5 flex flex-cols justify-evenly mb-5 dark:text-[#EEEEEE]">
                <div className="text-center">
                  <p className="text-2xl font-semibold">{user.posts.length}</p>
                  <span className="text-gray-500 ">Blogs</span>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-semibold">
                    {user.posts.length || "0"}
                  </p>
                  <span className="text-gray-500 ">Comments</span>
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
            {isAuth && (
              <div className="inline-flex gap-1">
              <button
                className="btn-primary"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                Edit Profile
              </button>
              <button
                className="btn-primary bg-red-500"
              >
                Delete Account
              </button>

              </div>
            )}
          </div>
        ) : (
          <div className="p-5 w-[40%] shadow-sm m-2 bg-white dark:bg-dark border dark:border-gray-700  ">
            <form onSubmit={handleFormSubmit}>
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-[#fff]">
                Update Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-zinc-300">
                This information will be displayed publicly so be careful what you
                share.
              </p>

              <div className="mt-10 flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="displayed name"
                  name="username"
                  // ref={statusRef}
                  defaultValue={user.name || ""}
                  className="inputs"
                />
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
                  <button type="submit" className="btn-primary">Update</button>
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
        )}
      </div>

      <div className=" m-2 divide-y w-[80%] divide-gray-300 dark:divide-gray-700">
        <h1 className="dark:text-white text-4xl  pb-2 ">Blog Posts</h1>
        <div className="posts pt-4 ">
          {user.posts.length > 0 ? (
            <UserFeed user={user} />
          ) : (
            <h1 className="text-3xl dark:text-[#EEEEEE]">User has no posts</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

export async function loader({ request, params }) {
  const userId = params.authorID;
  const response = await axios.get(`${import.meta.env.VITE_API_URI}/user/${userId}`);
  return response.data;
}
