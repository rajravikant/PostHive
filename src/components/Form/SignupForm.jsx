import React,{useState,useEffect} from 'react'
import { Form,useActionData,useNavigation} from 'react-router-dom'
const SignupForm = () => {
    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitted = navigation.state === 'submitting';

    const [isVisble,setIsVisible] = useState()
    useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <Form method='put' >
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-[#EEEEEE]"
        >
          Name
        </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          className='inputs'
        />
      </div>
    <div className="mb-5">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-600 dark:text-[#EEEEEE]"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className='inputs'
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
        required
        id="password"
        name="password"
        className='inputs'
      />
    </div>
    <div className="mb-5">
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-600 dark:text-[#EEEEEE]"
      >
        Confirm Password
      </label>
      <input
        type="password"
        name="cPass"
        className='inputs'
      />
    </div>
    {data && isVisble && <p className='text-green-500 border capitalize border-current w-full text-center'>{data.error || 'Error'}</p>}
    
    <button
      type="submit" disabled={isSubmitted}
      className="w-full p-3 mt-4 bg-primary text-white rounded shadow"
    >
      {isSubmitted ? 'Signing In' : 'Sign Up'}
    </button>
  </Form>
  )
}

export default SignupForm