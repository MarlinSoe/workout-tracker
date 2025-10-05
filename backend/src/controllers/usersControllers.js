import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: '3d' });
}


export async function loginUser (req, res) {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export async function signupUser (req, res) {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}