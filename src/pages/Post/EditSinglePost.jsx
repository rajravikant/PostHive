import axios from "axios";
import React, { useRef } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
  useLoaderData,
} from "react-router-dom";

const EditSinglePost = (props) => {
  const postId = useParams().postId.toString().trim();
  const post = useLoaderData();

  const titleRef = useRef();
  const imgRef = useRef();
  const conRef = useRef();

  const redirect = useNavigate();
  const token = useRouteLoaderData("root");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
      content: conRef.current.value,
      imageUrl: imgRef.current.value,
    };

    fetch(`http://localhost:8080/feed/post/${postId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          return redirect("/profile");
        }
      })

      .catch((err) => console.error(err));
  };
  return (
    <section className=" h-screen text-black dark:text-white rounded-md pt-20 px-10 ">
      <form
        className="flex justify-center flex-col gap-2 w-full"
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          ref={titleRef}
          defaultValue={post.title}
          name="title"
          placeholder="title"
          className="inputs"
        />

        <input
          type="text"
          name="imageUrl"
          ref={imgRef}
          defaultValue={post.imageUrl}
          placeholder="image url"
          className="inputs"
        />
        <textarea
          name="content"
          ref={conRef}
          defaultValue={post.content}
          placeholder="content here"
          className="inputs h-40"
        ></textarea>
        <button type="submit" className="btn-primary">
          {isSubmitting ? "Updating" : "Update"}
        </button>
        <Link className="btn-primary text-center" to="/profile">
          Cancel
        </Link>
      </form>
    </section>
  );
};

export default EditSinglePost;
