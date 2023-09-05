const Product = require("../models/Product");

class ProductRepo {


   async Create(data){
    try {   
        console.log(data)
        
    const response=await Product.create(data) ;
        return response;
    } catch (error) {
        throw error;
    }
   }
   async Delete(id){
    try {
    const response=await Product.findByIdAndDelete(id);
        return response;
    } catch (error) {
        throw error;
    }
   }
   async Update(id,data){
    try {
    const response=await Product.findByIdAndUpdate(id,data,{new:true,runValidators:true});
        return response;
    } catch (error) {
        throw error;
    }
   }  
   async Get(id){
    try {
    const response=await Product.findOne({_id:id});
        return response;
    } catch (error) {
        throw error;
    }
   }
   async GetAll(query){
    try {
        console.log(query,"query");
        console.log(query)
        const page=Math.abs(query.page)||1;
        console.log(page,"page");
        const noOfItems=8;
        const skip=(page-1)*noOfItems;
        const response=await Product.find({}).skip(skip).limit(noOfItems);
        return response;
    } catch (error) {
        throw error;
    }
   }
}
module.exports=ProductRepo;