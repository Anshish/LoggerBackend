import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill all the fields.')
    }
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists.')
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email, 
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

const getMe=asyncHandler(async(req,res)=>{
    return res.status(200).json(req.user)
})

const generateToken=(id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn:'30d'}
    )
}


export {registerUser,loginUser,getMe}