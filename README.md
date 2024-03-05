
# Bloggers Space

Bloggers Space is a personalized blog app where users can write and share blogs with an ease and simple ui .




## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB and Moongoose


## API Reference
#### All the api endpoints are defined in backend directory

```http
GET /feed/posts 
GET /feed/posts',feedController.getPosts
GET /feed/posts/:userId',feedController.getUsersPost
GET /feed/post/:postID',feedController.getSinglePost
GET /feed/user',isAuth,feedController.getUser
 
```
```http
router.post('/post',isAuth,feedController.putPost);
router.put('/post/:postID',isAuth,feedController.updatePost)
router.delete('/post/:postID',isAuth,feedController.deletePost)
router.patch('/user',isAuth,feedController.updateUser) 
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

