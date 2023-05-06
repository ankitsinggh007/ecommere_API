const express=require('express');
const { getItem, getAllItem, createItem, removeItem, updateItem, createProductReview } = require('../../controller/productContorller');
const { isAuthenticated, isAutherized } = require('../../middleware/Authentication');

const routers=express.Router();

routers.get('/:id',getItem);
routers.get('/',getAllItem);
routers.post('/',isAuthenticated,isAutherized('admin'),createItem);
routers.delete('/:id',isAuthenticated,isAutherized('admin'),removeItem);
routers.put('/:id',isAuthenticated,isAutherized('admin'),updateItem);
routers.put('/add_review/:id',isAuthenticated,createProductReview);

module.exports=routers;