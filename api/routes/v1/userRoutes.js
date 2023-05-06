const express=require('express');
const { Register, Login, LogOut, forgotPassword, getUserDeatils,updateUserDetails,updateUserpassword, deleteUserAdmin, updateUserByAdmin, getAllUser, createProductReview } = require('../../controller/userController');
const { isAuthenticated } = require('../../middleware/Authentication');
const { isAutherized } = require('../../middleware/Authentication');

const router=express.Router();

router.post('/register',Register);
router.post('/login',Login);
router.get('/logout',LogOut);
router.post('/resetPassword',forgotPassword);
router.get('/profile',isAuthenticated,getUserDeatils);
router.put('/update_profile',isAuthenticated,updateUserDetails);
router.put('/update_password',isAuthenticated,updateUserpassword);
router.delete('/:id',isAuthenticated,isAutherized('admin'),deleteUserAdmin);
router.put('/:id',isAuthenticated,isAutherized('admin'),updateUserByAdmin);
router.get('/:id',isAuthenticated,isAutherized('admin'),getAllUser);


module.exports=router;