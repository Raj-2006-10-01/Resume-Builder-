import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from "../models/Resume.js";


const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token;
}
//controller for user registation


// POST: /api/users/register
export const registerUser=async (req,res) => {
    try {
        const {name,email,password}=req.body;

        //check if required field are present 
        if (!name || !email || !password) {
            return res.status(400).json({message:"Missing required feild "})
        }
        
        //check if user exist
        
        const user =await User.findOne({email})
        if (user) {
            
            return res.status(400).json({message:"user already  exist "})
        }

        //create new user

        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await User.create({
            name,email,password:hashedPassword
        })

        //return success massage
        const token =generateToken(newUser._id)
        newUser.password=undefined;

        return res.status(201).json({message:'user Created succcessfully..',token,user:newUser})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}


//controller for user login
// POST: /api/users/login

export const loginUser=async (req,res) => {
    try {
        const {email,password}=req.body;

        //check if user  are exist 
        
        
        //check if user exist
        
        const user =await User.findOne({email})
        if (!user) {
            return res.status(400).json({message:"Invalid email or password"})
        }
        //check if password is correct

        if (!user.comparePassword(password)) {
            return res.status(400).json({message:"Invalid email or password"})
        }


        //return success massage
        const token =generateToken(user._id)
        user.password=undefined;

        return res.status(200).json({message:'Login succcessfully..',token,user})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

//controller for getting user by id
//GET:/api/user/data

export const getUserById=async (req,res) => {
    try {
        
        const userId=req.userId;

        //check if user exist

        const user=await User.findById(userId)
        if (!user) {
            return res.status(404).json({message:"user not found"})
        }
        //return user
        user.password=undefined;

        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

//controller for user resume
//GET: /api/users/resume

export const getUserResume=async (req,res) => {
    try {
        const userId=req.userId;
        //return user resume
        const resumes=await Resume.find({userid})
        return res.status(200).json({resumes})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}