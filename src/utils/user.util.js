import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';    

dotenv.config();

export const generateToken = (user) => {

    const payload = {
        id: user._id,
        email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    return token;
}

export const generateResetOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}