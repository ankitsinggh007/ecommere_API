// Warning
// const { creatInBulk, json, deleteInBulk } = require('./Fakedata');

const express=require('express');
const cookieParser=require('cookie-parser');
const errorMidlleware=require('./middleware/error');
const mainRoute=require('./routes');

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use('/api',mainRoute);



app.use(errorMidlleware);

module.exports=app;