const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')

const mongoose = require('mongoose')
const URI = 'mongodb+srv://ravikantraj:9zbjp31uv1feHVwg@cluster0.noy8uoe.mongodb.net/blogApp?retryWrites=true&w=majority&appName=Cluster0'

const app = express();

const fileStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'images')
    },
    filename : (req,file,cb)=>{
        cb(null,new Date().toISOString() + '-' +file.originalname)
    }
})

app.use(bodyParser.json());
app.use(multer({storage:fileStorage}).single('image')); 
app.use('/images',express.static(path.join(__dirname,'images')))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})
app.use('/feed',feedRoutes);
app.use('/auth',authRoutes);


app.use((error,req,res,next)=>{
    res.status(error.statusCode).json({message : error.message || 'server error'})
})



mongoose.connect(URI).then(()=>{
    app.listen(8080,()=>{
        console.log(`App Runnig at http://localhost:8080`);
    });

}).catch(err =>{
    throw new Error(err);
})