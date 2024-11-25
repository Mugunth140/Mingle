import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { tokenGenerator } from "../utils/utils.js"

export const signup = async (req, res) => {
    const {username, email, password} = req.body
    try {
        if(password.length < 8) {
            return res.status(400).json({message : "Password must be atleast 8 charaters" })
        }
        const user = await User.findOne({email})
       
       if (user) res.status(400).json({message : "Email Already Exists"})

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password : hashPassword
        })
        
        if(newUser){
            tokenGenerator(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                username : newUser.username,
                email : newUser.email,
                profilepic : newUser.profilepic
            });

        }else{
            res.status(400).json({message : "Invalid user data"})
        }

    } catch (error) {
        console.log(`Error on signup controller ${error.message}`)
        res.status(500).json({message : "Internal Server Error"})
    }
}

export const login = (req, res) => {
    res.send("Login ")
}

export const logout = (req, res) => {
    res.send("Logout ")
}