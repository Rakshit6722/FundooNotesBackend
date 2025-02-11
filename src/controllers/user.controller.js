import bcrypt, { compare } from 'bcrypt';
import httpStatus from 'http-status';
import { createUser, checkUserExist, comparePassword, getUsers, registerUser, loginService } from '../services/user.service';
import User from '../models/user.model'
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/user.util';

exports.getUsers = async (req, res) => {
    try {
        const users = await getUsers()
        console.log(req.user)
        if (users) {
            return res.status(200).json({
                code: httpStatus.OK,
                message: 'Users fetched successfully',
                data: users
            })
        }
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }


}

exports.registerUser = async (req, res) => {
    try {
        const user = await registerUser(req);

        if(user){
            return res.status(201).json({
                code: httpStatus.CREATED,
                data: user,
                message: 'User created successfully'
            })
        }else{
            return res.status(500).json({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'User not created'
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
       
        const { userWithoutPassword, token } = await loginService(req)

        console.log(userWithoutPassword, token)

        return res.status(200).json({
            code: httpStatus.OK,
            data: userWithoutPassword,
            token,
            message: 'Login successful'
        })
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}