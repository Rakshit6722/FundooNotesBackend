import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { createUser, checkUserExist } from '../services/user.service';
import User from '../models/user.model'

exports.registerUser = async (req, res) => {
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
            const user = await createUser(name, email, phone, hashedPassword);
            return res.status(201).json({
                code: 201,
                message: 'User created successfully',
                data: user
            })
        } catch (err) {
            return res.status(500).json({
                code: httpStatus.BAD_REQUEST,
                message: err.message
            })
        }


    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}

export const loginUser = async (req, res) => {
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

        const passwordMatch = await user.comparePassowrd(password);

        if (!passwordMatch) {
            return res.status(401).json({
                code: httpStatus.UNAUTHORIZED,
                message: 'Incorrect password'
            })
        }

        return res.status(200).json({
            code: httpStatus.OK,
            message: 'Login successful'
        })
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}