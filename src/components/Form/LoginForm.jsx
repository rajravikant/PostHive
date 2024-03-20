import React,{useEffect, useState} from "react";
import { Form,useNavigation,useActionData } from "react-router-dom";
const LoginForm = () => {
  const navigation = useNavigation();
  const isSubmitted = navigation.state === 'submitting'
  const data = useActionData();

  const [isVisble,setIsVisible] = useState()
    useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, [data]);



  return (
    <Form method="post">
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-[#EEEEEE]"
        >
          Email
        </label>
        <input
          type="email"
          id="email" name="email"
          className="inputs"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-[#EEEEEE]"
        >
          Password
        </label>
        <input
          type="password"
          id="password" name="password"
          className="inputs"
        />
      </div>
      {data && isVisble && <p className="text-red-500"> {data.data.error}</p>}
      <button
        type="submit"
        className="w-full p-3 mt-4 bg-primary text-white rounded shadow"
      >
        {isSubmitted ? 'Logging In' : 'Login'}
      </button>
    </Form>
  );
};

export default LoginForm;
