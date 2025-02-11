import User from '../models/user.model'
import bcrypt from 'bcrypt'
const mongoose = require('mongoose')
import { generateToken } from '../utils/user.util'
import dotenv from 'dotenv'

dotenv.config()

exports.getUsers = async () => {
    try {
        return await User.find()
    } catch (err) {
        throw err
    }
}

exports.registerUser = async (req) => {
    try {
        const { name, email, phone, password } = req.validatedBody;

        if (!name || !email || !password) {
            return res.status(400).json({
                code: httpStatus.BAD_REQUEST,
                message: 'Invalid input'
            })
        }

        if (await checkUserExist(email)) {
            return res.status(400).json({
                code: httpStatus.BAD_REQUEST,
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({
                name,
                email,
                phone,
                password: hashedPassword
            });
            return user
        } catch (err) {
            throw err
        }

    } catch (err) {
        throw err
    }
}

exports.loginService = async (req) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                code: httpStatus.BAD_REQUEST,
                message: 'Invalid input'
            })
        }

        const user = await checkUserExist(email);

        

        if (!user) {
            return res.status(404).json({
                code: httpStatus.NOT_FOUND,
                message: 'User not found'
            })
        }

        const passwordMatch = await comparePassword(password, user.password);


        if (!passwordMatch) {
            return res.status(401).json({
                code: httpStatus.UNAUTHORIZED,
                message: 'Incorrect password'
            })
        }

        const token = generateToken(user)

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return { userWithoutPassword, token }

    } catch (err) {
        throw err
    }
}


const checkUserExist = async (email) => {
    try {
        const user = await User.findOne({ email }).select('+password')
        return user
    }
    catch (err) {
        throw err
    }
}

const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash)
    } catch (err) {
        throw err
    }
}