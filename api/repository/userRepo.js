const User=require('../models/User');
class userRepo{

    async createUser(data){
        try {
        const response=await User.create(data) ;
            return response.$ignore('password');
        } catch (error) {
            throw error;
        }
       }

    async login(data){
        try {
            
            return response;
        } catch (error) {
            throw error;
        }
    }
       async DeleteUser(id){
        try {
        const response=await User.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw error;
        }
       }
       async UpdateUser(id,data){
        try {
        const response=await User.findByIdAndUpdate(id,data,{new:true,runValidators:true});
            return response;
        } catch (error) {
            throw error;
        }
       }  
       async GetUser(data){
        try {
        const response=await User.findOne(data);
            return response;
        } catch (error) {
            throw error;
        }
       }
       async GetAllUser(query){
        try {
           
            const response=await User.find();
            return response;
        } catch (error) {
            throw error;
        }
       }
}

module.exports=userRepo;