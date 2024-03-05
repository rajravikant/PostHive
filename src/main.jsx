import React from "react";
import ReactDOM from "react-dom/client";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/Root.jsx";
import Login,{action as loginAction} from './pages/Auth/Login.jsx'
import Signup,{action as signupAction} from './pages/Auth/Signup.jsx'
import SinglePost from "./pages/Post/SinglePost.jsx";
import EditSinglePost from "./pages/Post/EditSinglePost.jsx";
import {tokenLoader } from "./utils/authentication.js";
import { isAuthLoader } from "./utils/authentication.js";
import { getUserDetails as userLoader } from "./utils/authentication.js";
import { action as logoutAction } from "./utils/Logout.js";
import Error from "./pages/Error/Error.jsx";

import ProfileEdit from "./pages/Profile/ProfileEdit.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import NewPost from "./pages/Post/NewPost.jsx";
import UserFeed from "./pages/Feed/UserFeed.jsx";
import Home from "./pages/Home/Home.jsx";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} loader={tokenLoader} id="root" errorElement={<Error/>} >
        {/* public routes */}
      <Route path="" index={true} element={<Home/>}/>
      <Route path="login" element={<Login/>} action={loginAction}/>
      <Route path="signup" element={<Signup/>} action={signupAction} />
      <Route path="post/:postId" element = {<SinglePost/>} />


      {/* authenticated routes  */}

      <Route path="editProfile" element = {<ProfileEdit/>} loader={userLoader}   />
      <Route path="profile" element = {<Profile/>} loader={userLoader}/>
      <Route path="add-post" element = {<NewPost/>}   />
      <Route path="my-posts" element = {<UserFeed/>}   />
      <Route path="post/edit/:postId" element = {<EditSinglePost/>}/>
      <Route path="logout" action={logoutAction} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
