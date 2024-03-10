import React from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import SignupForm from "../../components/Form/SignupForm";
const Signup = () => {
  return (
    <div className="container mx-auto flex">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl text-center mb-9 dark:text-white font-bold">
          Sign Up
        </h1>
        <div className="bg-white rounded-md overflow-hidden shadow-md  dark:bg-dark border dark:border-gray-700">
          <div className="p-8">
            <SignupForm />
          </div>
          <div className="flex justify-between p-8 text-sm border-t border-gray-300  dark:border-gray-700 bg-gray-100 dark:bg-dark">
            <Link to="/login" className="font-medium text-primary">
              Login
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

export async function action({ request, params }) {
  const data = await request.formData();

  const name = data.get("username");
  const email = data.get("email");
  const password = data.get("password");
  const confirmPassword = data.get("cPass");

  const credential = {
    name,
    email,
    password,
    confirmPassword,
  };

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  });
  const result = await response.json();

  if (response.status === 403) {
    return result;
  } 
  console.log(response);
  return redirect('/');
  
}
