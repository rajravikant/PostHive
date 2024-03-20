import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import { generateBase64FromImage } from "../../utils/imagePreview";
import {
  useParams,
  useNavigate,
  useRouteLoaderData,
  useLoaderData,
} from "react-router-dom";

const EditSinglePost = (props) => {
  const post = useLoaderData();
  const postId = useParams().postId.toString().trim();
  const token = useRouteLoaderData("root");
  const redirect = useNavigate();

  const titleRef = useRef();
  const categoryRef = useRef();
  const [value, setValue] = useState(post.content);
  const [image, setImage] = useState({
    file: post.imageUrl,
    imgPreview: `${import.meta.env.VITE_API_URI}/images/${post.imageUrl}`,
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", titleRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("imageUrl", image.file);
    formData.append("content", value);

    axios
      .patch(`${import.meta.env.VITE_API_URI}/feed/post/${postId}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        if (result.status === 201) {
          return redirect("/profile");
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err);
      });
  };
  return (
    <section className="pt-5 max-w-[80%] mx-auto  dark:bg-dark py-5">
      <Toaster />
      <form
        className="flex justify-center flex-col gap-2 w-full"
        onSubmit={onSubmitHandler}
      >
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          name="title"
          defaultValue={post.title}
          placeholder="title"
          className="inputs"
        
        />

        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          Upload a file
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="file"
          className="inputs"
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
          accept="image/png, image/jpeg"
         
        />

        <div className="preview w-full ">
          <img src={image.imgPreview} className="h-[20rem] mx-auto" />
        </div>

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

        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 dark:text-white"
        >
          Category
        </label>

        <select
          name="category"
          id="category" defaultValue={post.category}
          ref={categoryRef}
          className="inputs"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-primary">
          Update
        </button>
      </form>
    </section>
  );
};

export default EditSinglePost;

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

const categories = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Design" },
  {
    id: 3,
    name: "Productivity",
  },
  {
    id: 4,
    name: "Business",
  },
  {
    id: 5,
    name: "Culture",
  },
  {
    id: 6,
    name: "Education",
  },
  { id: 7, name: "Technology" },
  { id: 8, name: "Health & Wellness" },
  { id: 9, name: "Travel" },
  { id: 10, name: "Food & Cooking" },
  { id: 11, name: "Sports & Fitness" },
  { id: 12, name: "Arts & Crafts" },
  { id: 13, name: "Relationships & Dating" },
];