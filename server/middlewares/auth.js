import User from "../models/user.js";
import jwt from "jsonwebtoken";
// middleware to check if the user is authenticated


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        // console.log(user);

        if (!user) {
            return res.json({success: false, message: "User not found"});
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
}