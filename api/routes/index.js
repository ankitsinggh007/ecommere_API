const express=require('express');
const v1Route=require('./v1');
const routers = express.Router();

routers.use('/v1',v1Route);

module.exports=routers;
