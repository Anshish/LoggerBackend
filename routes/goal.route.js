import express from 'express';
import {getGoals,setGoal,updateGoal,deleteGoal} from '../controllers/goal.controller.js'
import {protect} from '../middlewares/auth.middleware.js'

const router = express.Router();

// get goals
router.get('/',protect,getGoals)

// create goals
router.post('/',protect,setGoal)

// update goals
router.put('/:id',protect,updateGoal)

// delete goals
router.delete('/:id',protect,deleteGoal)


export {router as goalRoutes};
