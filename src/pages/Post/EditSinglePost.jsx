import React, { useState, useRef, useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
const EditSinglePost = (props) => {
  const postId = useParams().postId.toString().trim();
  const titleRef = useRef();
  const imgRef = useRef();
  const conRef = useRef();
  const redirect = useNavigate();
  const token = useRouteLoaderData("root");
  useEffect(() => {
    async function fetcher() {
      const response = await fetch(
        `http://localhost:8080/feed/post/${postId}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const result = await response.json();

      if (response.status === 404) {
        console.error(result.error.message);
        return;
      }

      titleRef.current.value = result.post.title;
      conRef.current.value = result.post.content;
      imgRef.current.value = result.post.imageUrl;
    }
    fetcher();
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let error;
    const data = {
      title: titleRef.current.value,
      content: conRef.current.value,
      imageUrl: imgRef.current.value,
    };

    fetch(`http://localhost:8080/feed/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          error = 404;
        }
        return response.json();
      })
      .then((res) => {
        if (error) {
          console.error(res.error);
          return redirect('/');
        }
        console.log(res);
        redirect("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <section className=" h-screen text-black  rounded-md pt-20 px-10 ">
      <form
        className="flex justify-center flex-col gap-2 w-full"
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          ref={titleRef}
          name="title"
          placeholder="title"
          className="inputs"
        />

        <input
          type="text"
          name="imageUrl"
          ref={imgRef}
          placeholder="image url"
          className="inputs"
        />
        <textarea
          name="content"
          ref={conRef}
          placeholder="content here"
          className="inputs h-40"
        ></textarea>
        <button type="submit" className="btn-primary">
          Update
        </button>
        <Link className="btn-primary text-center" to="/">
          Cancel
        </Link>
      </form>
    </section>
  );
};

export default EditSinglePost;
