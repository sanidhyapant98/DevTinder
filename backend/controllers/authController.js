import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"

export const signup = async (req, res)=>{
    try {
        const {firstName, lastName, email, password, gender, age} = req.body
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = await User.create({firstName, lastName, email, password: hashedPassword, gender, age})
        res.status(201).send("User created successfully")
    }catch(err){
        res.status(500).send("Error : " + err.message)
    }
}