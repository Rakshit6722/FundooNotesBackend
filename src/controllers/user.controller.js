import bcrypt, { compare } from 'bcrypt';
import httpStatus from 'http-status';
import { createUser, checkUserExist, comparePassword, getUsers, registerUser, loginService, forgetPasswordService, updateUserService, deleteUser, deleteUserService, resetPasswordService } from '../services/user.service';
import User from '../models/user.model'
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/user.util';
import { response } from 'express';

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
        return res.status(err.code ? err.code : 500).json({
            code: err.code ? err.code : httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
       
        const { token } = await loginService(req)

        // console.log(userWithoutPassword, token)

        return res.status(200).json({
            code: httpStatus.OK,
            token,
            message: 'Login successful'
        })
    } catch (err) {
        console.log(err)
        return res.status(err.code ? err.code : 500).json({
            code: err.code ? err.code :  httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}

export const forgetPassword = async (req, res) => {
    try{
        const { resetToken, email} = await forgetPasswordService(req)
        console.log("resetToken",resetToken)
        if(!resetToken){
            return res.status(500).json({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'OTP not generated'
            })
        }else{
            return res.status(200).json({
                code: httpStatus.OK,
                message: 'OTP generated successfully',
                data: {resetToken, email}
            })
        }

    }catch(err){
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await updateUserService(req)
        if(updatedUser){
            return res.status(200).json({
                code: httpStatus.OK,
                message: 'User updated successfully',
                data: updatedUser
            })
        }else{
            return res.status(500).json({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'User not updated'
            })
        }
    }catch(err){
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}


exports.deleteUser = async (req ,res) => {
    try{
        const responseMessage = await deleteUserService(req)
        if(responseMessage){
            return res.status(200).json({
                code: httpStatus.OK,
                message: responseMessage
            })
        }else{
            return res.status(500).json({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'User not deleted'
            })
        }
    }catch(err){
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
    })
    }
}