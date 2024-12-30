import jwt from "jsonwebtoken";
import User from '../src/models/user.model';
export const isAuthenticated = async (req, res, next) => {
    const { token } = req?.cookies;
    if (!token) {
        return res.status(401).json({ success: false, message: "Login First" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};
