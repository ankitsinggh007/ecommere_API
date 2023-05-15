// Warning
// const { creatInBulk, json, deleteInBulk } = require('./Fakedata');
const Connect = require('./config/databseConfig');
const cors=require('cors')
require('dotenv').config();
const express=require('express');
const cookieParser=require('cookie-parser');
const errorMidlleware=require('./middleware/error');
const mainRoute=require('./routes');

const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

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