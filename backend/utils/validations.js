export const validateSignup = (req, res, next) => {
    const {firstName, lastName, email, password, gender, age} = req.body
    if(!firstName || !lastName || !email || !password || !gender || !age){
        return res.status(400).send("All fields are required")
    }
    next()
}