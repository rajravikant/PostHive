
# Bloggers Space

Bloggers Space is a personalized blog app where users can write and share blogs with an ease and simple ui .
Currently project is on early development so it has some bugs and less secure. By the time of deployement this app will be ready to serve in market




## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB and Moongoose


## API Reference
#### All the api endpoints are defined in backend directory

```http
 /feed/posts 
 /feed/posts',feedController.getPosts
 /feed/posts/:userId',feedController.getUsersPost
 /feed/post/:postID',feedController.getSinglePost
 /feed/user',isAuth,feedController.getUser
 /post,isAuth,feedController.putPost
 /post/:postID',isAuth,feedController.updatePost
 /post/:postID',isAuth,feedController.deletePost
 /user',isAuth,feedController.updateUser 
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/rajravikant/Bloggers-Space
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

for clinet
```bash
  npm run dev 
```


for server
```bash
  npm start 
```

