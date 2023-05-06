
const express=require('express');
const ProductRoute=require('./ProductRoutes');
const userRoutes=require('./userRoutes');
const routers = express.Router();

routers.use('/product',ProductRoute);
routers.use('/user',userRoutes);

module.exports=routers;
