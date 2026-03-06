import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/authRouter.js"
import profileRouter from "./routes/profileRouter.js"
import cookieParser from "cookie-parser"
import requestRouter from "./routes/requestRouter.js"
import userRouter from "./routes/userRoute.js"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/request', requestRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.bgGreen)
})