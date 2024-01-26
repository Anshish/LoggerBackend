import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {goalRoutes} from './routes/goal.route.js'
import {userRoutes} from './routes/user.route.js'
import {errorHandler} from './middlewares/error.middleware.js'
import {connectDB} from './config/db.js'

dotenv.config()
connectDB()
const port=process.env.PORT

const app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/api/goals',goalRoutes)
app.use('/api/users',userRoutes)
app.use(errorHandler)

app.listen(port,()=>console.log(`Server is running on port ${port}`))