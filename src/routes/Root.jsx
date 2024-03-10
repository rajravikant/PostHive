import React, { useEffect } from "react";
import Header from "../components/Navigation/Header";
import { Outlet,useRouteLoaderData} from "react-router";
import { useSubmit } from "react-router-dom";

const Root = () => {
  const token = useRouteLoaderData('root');
 

  // // ============auto logout ===========
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


    useEffect( ()=>{
     
    },[])
  return (
    <React.Fragment>
      <Header  />
      <main className=" bg-primaryL  dark:bg-dark min-h-screen overflow-hidden font-pop">
        <Outlet />
      </main>
    </React.Fragment>
  );  
};

export default Root;
