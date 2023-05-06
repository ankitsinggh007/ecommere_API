
const errorMidlleware=(err,req,res,next)=>{
console.log(err);
err.statusCode = err.statusCode|| 500;
err.message = err.message ||"internal server error";
res.status(err.statusCode).json({
    sucess:false,
    message:err.message,
    response:[],
    error:err
})
};
module.exports =errorMidlleware;