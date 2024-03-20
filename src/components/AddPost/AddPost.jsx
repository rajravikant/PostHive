import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";

import {
  useRouteLoaderData,
  useNavigate,
  useNavigation,
  
} from "react-router-dom";
import axios from "axios";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const AddPost = () => {
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();
  const titleRef = useRef();
  const [value, setValue] = useState("");
  const [image, setImage] = useState();


  const onSubmitHandler = async (e) => {
  
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("imageUrl", image);
    formData.append("content", value);

   
    const response = axios
      .post(`${import.meta.env.VITE_API_URI}/feed/post`, formData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.status !== 201) {
          console.error(res.data.error);
        }
        if (res.status === 201) {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error,{icon:"❌"});
      });

      toast.promise(
        response,
        {
          loading: 'Posting',
          success: (data) => `Successfully saved ${data.message}`,
          error: (err) => `This just happened: ${err.toString()}`,
        },
        {
          style: {
            minWidth: '250px',
          },
          success: {
            duration: 5000,
            icon: '🔥',
          },
          error: {
            duration: 5000,
            icon: '❌',
          },
        }
      );
      
  };

  return (
    <section className="pt-5 max-w-[80%] mx-auto  dark:bg-dark">
      <Toaster />
      <form
        className="flex justify-center flex-col gap-2 w-full"
        onSubmit={onSubmitHandler}
      >
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 dark: text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          name="title"
          placeholder="title"
          className="inputs"
          required
        />

        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium leading-6 dark: text-white"
        >
          Upload a file
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="file" className="inputs"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/png, image/jpeg"
        />

        <label
          htmlFor="content"
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          Content
        </label>

        <ReactQuill
          theme="snow"
          value={value}
          onChange={(e) => setValue(e)}
          id="content"
          className="dark:text-white"
          modules={modules}
          formats={formats}
        />

        <button type="submit" className="btn-primary">Post</button>
      </form>
    </section>
  );
};
export default AddPost;
