import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
export const signup = async (req, res) => {

    const {fullname, email, password} = req.body;
    try {
        if(password.length < 6){
            return res.status(400).json({message: "password is less than 6 characters"})
        }
        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message: "email already exists"})
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })

        if (newUser){ //new user was added successfully
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else{
            res.status(400).json({message: "Invalid User Data"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}
export const login = (req, res) => {
    res.send("Login route")
}
export const logout = (req, res) => {
    res.send("Logout route")
}