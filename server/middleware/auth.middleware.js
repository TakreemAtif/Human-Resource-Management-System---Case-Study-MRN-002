import jwt from 'jsonwebtoken';
import authIdentity from '../models/authIdentity.model.js';

export const verifyAuthIdentityForOTP = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(400).json({
                success: false, 
                message: "Plase login first!",
                errorCode: "LOGIN_REQUIRED"
            });
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await authIdentity.findById(decoded.id);
        const otpData = foundUser.otp;

        const now = new Date();
        if(now.getTime() < otpData.expiresIn){
            return res.status(400).json({
                success: false,
                message: "OTP has expired, try loggin in again!",
                errorCode: "OTP_EXPIRED"
            });
        }

        req.user = { 
            id: decoded.id, 
            email: decoded.email, 
            payload: decoded.payload || {},
            dbOtp: otpData.otp
        };
        next();
    }catch(err){
        console.log("Middleware Error:", err);
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Invalid or session-expired token. Please login again.",
                errorCode: "INVALID_TOKEN"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error, (midware)",
            errorCode: "SERVER_FAULT"
        });
    }
}