import React, { useState, useRef } from "react";
import { redirect, useRouteLoaderData,useNavigate,useNavigation } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
const AddPost = () => {
  const token = useRouteLoaderData("root");
  const useN = useNavigate();
  const navigation = useNavigation();
  const isSubmitted = navigation.state === 'submitting'
  const [data, setData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const titleChangeHandler = (e) => {
    setData((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };
 
  const contentChangeHandler = (e) => {
    setData((prev) => {
        return {
          ...prev,
          content: e.target.value,
        };
      });
  };
  const imageChangeHandler = (e) => {
    setData((prev) => {
        return {
          ...prev,
          imageUrl: e.target.value,
        };
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const sendData = {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
    }

        fetch("http://localhost:8080/feed/post", {
          method: "POST",
          headers: { 
             "Content-Type": "application/json",  
             Authorization : 'Bearer '+token
          },
          body: JSON.stringify(sendData),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
           
            useN('/my-posts');
          })
          .catch((err) => {
            throw new Error(err);
          });
  
  };

  return (
    <section className="mt-20 max-w-[80%] mx-auto  dark:bg-slate-900">
          <form
            className="flex justify-center flex-col gap-2 w-full"
            onSubmit={onSubmitHandler}
          >
            <input
              type="text"
              onChange={titleChangeHandler}
              name="title"
              placeholder="title"
              className="inputs"
              required
            />
            <input
              type="text" onChange={imageChangeHandler}
              name="imageUrl"
              placeholder="image url"
              className="inputs"
              required
            />

            <div className="">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                  or
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-500 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer px rounded-md bg-blue-400 font-semibold text-white focus-within:outline-none  hover:text-indigo-500"
                      >
                        <span className="p-1">Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

            <textarea
              name="content" onChange={contentChangeHandler}
              placeholder="content here"
              className="inputs min-h-48"
              required
            ></textarea>
            <button type="submit" className="btn-primary">
            {isSubmitted ? 'Posting' : 'Post'}
            </button>
          </form>
    </section>
  );
};

export default AddPost;
