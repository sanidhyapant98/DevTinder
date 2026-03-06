import express from "express"
import {sendConnectionRequest, reviewConnectionRequest} from "../controllers/requestController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", authMiddleware, sendConnectionRequest);
requestRouter.post("/review/:status/:requestId", authMiddleware, reviewConnectionRequest);

export default requestRouter;