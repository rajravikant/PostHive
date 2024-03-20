import React from "react";
import Header from "../components/Navigation/Header";
import { Outlet} from "react-router";

import useMagneticHover from '../utils/useMagneticHover'
import Footer from "../components/Navigation/Footer";
const Root = () => {

  useMagneticHover();
 

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


   
  
  return (
    <React.Fragment>
      <Header/>
      <main className="bg-primaryL dark:bg-dark min-h-screen font-pop">
        <Outlet />
      </main>
      <Footer/>
    </React.Fragment>
  );  
};

export default Root;
