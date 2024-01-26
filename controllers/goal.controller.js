import asyncHandler from 'express-async-handler'
import Goal from '../models/goal.model.js'

const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find({user:req.user._id})
    res.status(200).json(goals)
})

const setGoal=asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field.')
    }
    const goal=await Goal.create({
        text:req.body.text,
        user:req.user._id
    }) 
    res.status(200).json({
        goal
    })
})

const updateGoal=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    console.log(goal.text);
    console.log(req.params.id);
    console.log(req.body);
    if(!goal){
        res.status(400)
        throw new Error('Goal not found.')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found.')
    }
    if(goal.user.toString()!==req.user._id.toString()){
        res.status(401)
        throw new Error('Not authorized to update this goal.')
    }
    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedGoal)
})
 
const deleteGoal=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    console.log(req.user._id.toString());
    console.log(goal.user);
    if(!goal){
        res.status(400)
        throw new Error('Goal not found.')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found.')
    }
    if(goal.user.toString()!==req.user._id.toString()){
        res.status(401)
        throw new Error('Not authorized to delete this goal.')
    }
    await goal.deleteOne()
    res.status(200).json({
        id:req.params.id
    })
})

export {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}