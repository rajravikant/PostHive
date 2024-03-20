import { redirect } from "react-router-dom";
import axios from "axios";
export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function isAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }
  return  token;
}

export async function getUserDetails() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login")
  }
  const response = await axios.get(`${import.meta.env.VITE_API_URI}/user`, {
    headers: {
      Authorization: "Bearer " + token,
    },  
  })

  if (response.status === 404) {
    throw new Error("Some error occured");
  } else { 
    return response.data.user;
  }
}


export async function postInfoLoader({request,params}){
  const pId = params.postId
  const response = await fetch(`${import.meta.env.VITE_API_URI}/feed/post/`+pId);

  if (!response.ok) {
    throw new Error("Some error occured");
  } else {
    const data = await response.json();
    return data.post;
  }
}


