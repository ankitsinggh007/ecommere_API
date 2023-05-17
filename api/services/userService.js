const User = require("../models/User");
const ProductRepo = require("../repository/productRepo");
const userRepo = require("../repository/userRepo");

class userService{

    constructor(){
        this.userrepo=new userRepo();
    }


    async Create(data){
        try {
        const response=await this.userrepo.createUser(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async login(data){
        try{
            const {password,email}=data;
        
        if(!email||!password) throw new Error("please provde email or password");
        const response=await this.userrepo.GetUser({email});
        
        if(!response) throw new Error("please provide correct email");
        console.log(password,"password");
        const isPasswordMatch=await response.comparePassword(password);
        console.log(isPasswordMatch)
        if(!isPasswordMatch) throw new Error("please provide correct password");
        
        const token=response.genToken();
                const {name,role,_id}=response;
                const user={name,email:response.email,role,_id};
            return {token,user}
            
        
        } catch (error) {
            throw error;
        }
    }

    async findUser(data){
        try {
            const response=await this.userrepo.GetUser(data);
        return response;
        } catch (error) {
            throw error;
        }
    }
    async findAllUser(data){
        try {
            const response=await this.userrepo.GetAllUser(data);
        return response;
        } catch (error) {
            throw error;
        }
    }
    async update(id,data){
        try {
            const response=await this.userrepo.UpdateUser(id,data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async delete(id){

        try {
            const response = await this.userrepo.DeleteUser(id);
        return response;
        } catch (error) {
            throw error
        }
    }
    
    

}

module.exports=userService;