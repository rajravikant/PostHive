import React, { useEffect } from "react";
import Header from "../components/Navigation/Header";
import { Outlet,useLoaderData,useRouteLoaderData} from "react-router";
import { useSubmit } from "react-router-dom";

const Root = () => {
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  // ============auto logout ===========
  // useEffect(()=>{
  //   if (!token) {
  //     return
  //   }
  //   const expiryDate =  new Date(localStorage.getItem('expiryDate'))
  //   const currentTime = Date.now()
  //   const expiryName = expiryDate.getTime()

  //   let diff = expiryName - currentTime
    
  //   setTimeout(()=>{
  //     submit(null,{action : '/logout'})
  //   },diff)
  // },[token,submit])
  return (
    <React.Fragment>
      <Header  />
      <main className="bg-gray-900 min-h-screen overflow-hidden font-pop">
        <Outlet />
      </main>
    </React.Fragment>
  );  
};

export default Root;
