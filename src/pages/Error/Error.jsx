import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../../components/Navigation/Header";
const Error = () => {
  const error = useRouteError();
  return (
    <>
      <Header />
      <section className="w-full my-10 flex justify-center items-center">
        <div className="text-center">
        <h1 className="text-4xl text-red-500 font-bold">{error.status} {error.statusText}</h1>
        <p className="text-3xl text-black font-thin">{error.data}</p>
        </div>

      </section>
    </>
  );
};

export default Error;
