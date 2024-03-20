import React from "react";
import { Link, redirect} from "react-router-dom";
import axios from "axios";

import LoginForm from "../../components/Form/LoginForm";

const Login = () => {

  return (
    <div className="container mx-auto flex lg:p-0 p-5">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl text-center mb-9 dark:text-white font-bold">
          Login
        </h1>
        <div className="bg-white dark:bg-dark border dark:border-gray-700 rounded-md shadow-sm">
          <div className="p-8">
          <LoginForm/>
          </div>
          <div className="flex justify-between p-8 text-sm border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-dark">
            <Link to="/signup" className="font-medium text-primary">
              Create account
            </Link>
            <a href="#" className="text-gray-600 dark:text-[#EEEEEE]">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


export async function action({request,params}){
  const data =  await request.formData();

  const formData = new FormData();
  formData.append('email',data.get("email"));
  formData.append('password',data.get("password"));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/auth/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      
      if (response.status !== 200) {
        return response.data;
      }

      if (response.status === 200) {
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userID", response.data.userId);
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        localStorage.setItem('avatar',response.data.avatar);
        

        return redirect("/");
      }

     
    } catch (error) {
      return error.response;
    }






}