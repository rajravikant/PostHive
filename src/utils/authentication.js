import { redirect } from "react-router-dom";

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
  const response = await fetch("http://localhost:8080/feed/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Some error occured");
  } else {
    const data = await response.json();
    return data.user;
  }
}
