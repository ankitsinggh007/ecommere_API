const productService = require("../services/productService");
const cloudinary=require('cloudinary');

const productservice=new productService();

const createItem=async (req, res, next)=>{
    try {
        if(req.body.images.length>0){
        for(let i=0;i<req.body.images.length;i++){
            const myCloud = await cloudinary.v2.uploader.upload(req.body.images[i], {transformation: [
                {width: 1000, crop: "scale"},
                {quality: "auto"},
                {fetch_format: "auto"}
                ]});
              
              req.body.images[i] = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              };
        }
        }
        const response=await productservice.listItem({...req.body,user:req.user._id});

        return res.status(201).json({
            success:true,
            message:"item is succesfully listed",
            response:response,
            error:{}
        })

    } catch (error) {
        return res.status(201).json({
            success:false,
            message:`${error.message}`,
            response:[],
            error:error
        })
    }
}

const removeItem=async (req, res, next)=>{
    try {
        const response=await productservice.deleteItem(req.params.id);

        return res.status(201).json({
            success:true,
            message:"item is succesfully deleted",
            response:response,
            error:{}
        })

    } catch (error) {
        return res.status(201).json({
            success:false,
            message:`${error.message}`,
            response:[],
            error:error
        })
    }
}
const updateItem=async (req, res, next)=>{
    try {
        const id=req.params.id;
        const response=await productservice.UpdateItem(id,req.body);

        return res.status(201).json({
            success:true,
            message:"item is succesfully updated",
            response:response,
            error:{}
        })

    } catch (error) {
        return res.status(201).json({
            success:false,
            message:`${error.message}`,
            response:[],
            error:error
        })
    }
}
const getItem=async (req, res, next)=>{
    try {
        const response=await productservice.GetItem(req.params.id);
        return res.status(201).json({
            success:true,
            message:"item is succesfully fetched",
            response:response,
            error:{}
        })

    } catch (error) {
        return res.status(201).json({
            success:false,
            message:`${error.message}`,
            response:[],
            error:error
        })
    }
}
const getAllItem=async (req, res, next)=>{
    try {

        const response=await productservice.GetItems(req.query);
       
       
       
        return res.status(201).json({
            success:true,
            message:"item's is succesfully fetched",
            response:response,
            count:response.length,
            error:{}
        })

    } catch (error) {
        return res.status(201).json({
            success:false,
            message:`${error.message}`,
            response:[],
            error:error
        })
    }
}
const createProductReview=async(req,res,next)=>{

    try {
        const response=await productservice.createReview(req);

     return res.status(201).json({
            success:true,
            message:"item's reviewed sucessfully",
            response:response,
            error:{}
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`${error.message}`,
            response:[],
            error:error
        })
    }
    }


module.exports={
    createItem,removeItem,getAllItem,
    updateItem,getItem,createProductReview
}