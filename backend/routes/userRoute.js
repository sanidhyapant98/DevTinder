import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { getConnectionRequests, viewConnections } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/requests/recieved", authMiddleware, getConnectionRequests)
userRouter.get("/connections", authMiddleware, viewConnections)

export default userRouter