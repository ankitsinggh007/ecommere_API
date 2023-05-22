const User = require("../models/User");
const productService = require("../services/productService");
const userService = require("../services/userService");
const sendEmail = require("../utils/passwordRecover");
const cloudinary=require('cloudinary');
const userservice = new userService();

const Register = async (req, res, next) => {
  try {
   

    const response = await userservice.Create(req.body);
    return res.status(201).json({
      success: true,
      message: "user is succesfully registered",
      response: response,
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
};
const Login = async (req, res, next) => {
  try {
    const {token,user} = await userservice.login(req.body);

    const option = {
      expires: new Date(
        Date.now() + process.env.Expire_Cokies * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: 'none',
       secure: true
    };
    return res.status(200).cookie("token", token, option).json({
      success: true,
      message: "user is succesfully login",
      response: user,
      token:token,
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
};
const LogOut = async (req, res, next) => {
  try {
    // const response=await userservice.loggout();

    const option = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    return res.status(201).cookie("token", null, option).json({
      success: true,
      message: "user is succesfully loggout",
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
};

const loadUser=async(req,res,next)=>{

  console.log(req.user,"user");

}

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Please enter your email");

    const User = await userservice.findUser({ email });

    if (!User) throw new Error("Please enter correct password");
    const resetToken = User.genResetPasswordToken();

    User.save();
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    await sendEmail({
      email: User.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${User.email} successfully`,
    });
  } catch (error) {
    // User?.resetPasswordToken = undefined;
    // User?.resetPasswordExpire = undefined;

    // await User?.save({ validateBeforeSave: false });

    return res.status(400).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
};
const getUserDeatils = async (req, res, next) => {
  try {
    const response = await userservice.findUser(req.user._id);
    res.status(200).json({
      success: true,
      message: "sucessfully fetched user details",
      response: response,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `${error.message}`,
      data: [],
      error: error,
    });
  }
};
const updateUserDetails = async (req, res, next) => {

  
  try {
    const newUserData={
      ...req.body
    }
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user?.avatar?.public_id;
      if(imageId) {
  
        await cloudinary.v2.uploader.destroy(imageId);
      }
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
   
    
    const response = await userservice.update(req.user._id, { ...newUserData });
    const {_id,name, email, phone,avatar ,address} = response;
    return res.status(201).json({
      sucess: true,
      message: "sucessfully updated",
      data: {_id,name,email,phone,address,avatar},
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      sucess: true,
      message: `${error.message}`,
      data: [],
      error: error,
    });
  }
};
const updateUserpassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await userservice.findUser(req.user._id);
    if (!oldPassword) throw new Error("please provide password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatch) throw new Error("please provide correct password");
    if (!newPassword || !confirmPassword)
      throw new Error(`please provide new and confirm password `);
    if (newPassword != confirmPassword)
      throw new Error(`mismatched new and confirm password`);

    user.password = confirmPassword;
    const response = await user.save();

    return res.status(201).json({
      sucess: true,
      message: "sucessfully updated",
      response: response,
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
};

// for admin

const deleteUserAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, "id");
    const response = await userservice.delete(id);

    return res.status(201).json({
      sucess: true,
      message: "sucessfully deleted",
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: `${error.message}`,
      data: [],
      error: error,
    });
  }
};

const updateUserByAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    if (!req.body.role) throw new Error("please provide role");
    const response = await userservice.update(id, req.body);

    return res.status(201).json({
      sucess: true,
      message: "sucessfully updated",
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: `${error.message}`,
      data: [],
      error: error,
    });
  }
};
const getAllUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    let response;
    if (id!='getAll') {
      response = await userservice.findUser({_id:id});
    } else {
      response = await userservice.findAllUser();
    }
    return res.status(201).json({
      sucess: true,
      message: "sucessfully fetched",
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: `${error.message}`,
      data: [],
      error: error,
    });
  }
};


module.exports = {
  LogOut,
  Login,
  Register,
  forgotPassword,
  getUserDeatils,
  updateUserDetails,
  updateUserpassword,
  deleteUserAdmin,
  updateUserByAdmin,
  getAllUser,
  loadUser
  
};
