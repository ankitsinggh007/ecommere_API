// Warning
// const { creatInBulk, json, deleteInBulk } = require('./Fakedata');
const Connect = require('./config/databseConfig');
const cors=require('cors')
require('dotenv').config();
const express=require('express');
const cookieParser=require('cookie-parser');
const errorMidlleware=require('./middleware/error');
const mainRoute=require('./routes');

const cloudinary=require('cloudinary').v2;
cloudinary.config({
    cloud_name: "df9ovzwh6",
    api_key: "959872715293163",
    api_secret: "8Cu8RGZmUHp2xAmV0Xo4Wc28JNk"
  });
const app=express();

const corsConfig = {
    origin: ' http://localhost:5173',
    credentials: true,
  };
  
  app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended,limit: '50mb'}));


app.use('/api',mainRoute);

app.get('/',(req,res)=>{
    
    res.send("server is live");

})

app.use(errorMidlleware);

const connect=async()=>{
    try {
        await Connect(process.env.Mongo_URI);
        app.listen(process.env.PORT,()=>{
            console.log(`development server started on ${process.env.PORT}`);
        });
    } catch (error) {
        throw error;
    }
}

connect();

module.exports=app;