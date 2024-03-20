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
import SinglePost,{loader as singlePostLoder} from "./pages/Post/SinglePost.jsx";
import EditSinglePost from "./pages/Post/EditSinglePost.jsx";
import {tokenLoader } from "./utils/authentication.js";
import { isAuthLoader } from "./utils/authentication.js";
import { getUserDetails as userLoader , postInfoLoader as postLoader} from "./utils/authentication.js";
import { action as logoutAction } from "./utils/Logout.js";
import NewPost from "./pages/Post/NewPost.jsx";
import UserFeed from "./pages/Feed/UserFeed.jsx";
import Home from "./pages/Home/Home.jsx";
import Users,{loader as usersLoader} from "./pages/Users/Users.jsx";

import Error from "./pages/Error/Error.jsx";
import UserProfile,{loader as userLd} from "./pages/Profile/UserProfile.jsx";
import PostByCategory,{loader as pacLoader} from "./pages/Post/PostByCategory.jsx";





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} loader={tokenLoader} id="root" >

        {/* public routes */}
      <Route index element={<Home/>}/>
      <Route path="login" element={<Login/>} action={loginAction}/>
      <Route path="signup" element={<Signup/>} action={signupAction} />
      <Route path="post/:postId" element = {<SinglePost/>}  loader={singlePostLoder} />
      <Route path="authors" element = {<Users/>} loader={usersLoader} />
      <Route path="author/:authorID/profile" element = {<UserProfile/>} loader={userLd} />
      <Route path="posts/:category" element = {<PostByCategory/>} loader={pacLoader} />
      
      

      {/* protected routes  */}

   
      <Route path="add-post" element = {<NewPost/>} loader={isAuthLoader}   />
      <Route path="my-posts" element = {<UserFeed/>} loader={isAuthLoader}  />
      <Route path="post/edit/:postId" element = {<EditSinglePost/>} loader={postLoader}/>
      <Route path="logout" action={logoutAction} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
