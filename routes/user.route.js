import express from 'express'
import {getMe, loginUser, registerUser} from '../controllers/user.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)

export {router as userRoutes}