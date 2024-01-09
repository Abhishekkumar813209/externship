import express from "express";
import UserModal from "./../Modal/userModal.js"
import expressAsyncHandler from "express-async-handler"
import generateToken from "../config/GenerateToken.js";


export const registerController = expressAsyncHandler( async(req,res) =>{
        const {name,email,password} = req.body;
        if(!name || !email || !password) {
            res.send(400);
            throw Error("All necessary input fields have not been filled")
        }

        const userExist = await UserModal.findOne({email});
        if(userExist){
          throw new Error("User already Exist")  
        }

        const user = await UserModal.create({name,email,password})
        if(user){
        res.status(200).json({
            success:true,
            _id:user._id,
            message:"User Registered Successfully",
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
      }else{
        res.status(400);
        throw new Error("Registration Error")
      }
});



export const loginController = expressAsyncHandler(async(req,res) =>{
        const {email,password} = req.body;
        const user = await UserModal.findOne({email});
        console.log(user);
        console.log(await user.matchPassword(password));
        if(user&&(await user.matchPassword(password))){
          res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
          })
        }else{
          throw new Error("Error in Login ")
        }
});

export const fetchAllUsers = expressAsyncHandler(async(req,res)=>{
  const keyword = req.query.search ? {
    $or:[
      {name:{$regex : req.query.search, $options:"i"}},
      {email:{$regex: req.query.search, $options:"i"}}
    ]
  }:{};

  const users = await UserModal.find(keyword).find({
    _id:{$ne:req.user._id},
  });
  res.send(users);
})