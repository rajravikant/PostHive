import React, { useRef, useState } from "react";
import { Link ,redirect} from "react-router-dom";
import SignupForm from "../../components/Form/SignupForm";
const Signup = () => {
  return (
    <div className="container mx-auto flex">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl text-center mb-9 text-white font-bold">
          Sign Up
        </h1>
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <div className="p-8">
            <SignupForm />
          </div>
          <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
            <Link to="/login" className="font-medium text-indigo-500">
              Login
            </Link>
            <Link to={"/forgot"} className="text-gray-600">
              Forgot password?
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
 

    const credential = {
      name: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword : data.get("cPass")
    };
   
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const result = await response.json()

    if (!response.ok) {
      return result
    }

  
    if (response.status === 201) {
      console.log(response);
      return result
    }

  }
 

