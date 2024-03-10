import React from "react"; 
import { Link, redirect} from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
const Login = () => {
  return (
    <div className="container mx-auto flex">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl text-center mb-9 dark:text-white font-bold">
          Login
        </h1>
        <div className="bg-white dark:bg-dark border dark:border-gray-700 rounded-md shadow-lg">
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
  const email = data.get('email')
  const password = data.get('password')
  
  const credential = {
    email,
    password
   }
 
   const response = await fetch("http://localhost:8080/auth/login", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(credential),
   })
 
   const result = await response.json()
 
   if (response.status === 401) {
       return result;
   } 
   if (response.status === 200) {
     localStorage.setItem("token", result.token);
     localStorage.setItem("userID", result.userId);
     const remainingMilliseconds = 60 * 60 * 1000;
         const expiryDate = new Date(
           new Date().getTime() + remainingMilliseconds
         );
     localStorage.setItem('expiryDate', expiryDate.toISOString());
     return redirect('/');
   }

 
}
