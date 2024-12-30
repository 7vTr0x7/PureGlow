import jwt from "jsonwebtoken";
export const sendCookies = (admin, res, message) => {
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    return res
        .status(200)
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "Development",
    })
        .json({ success: true, message, token });
};
