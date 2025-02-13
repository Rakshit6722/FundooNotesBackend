import User from '../models/user.model'
import bcrypt from 'bcrypt'
const mongoose = require('mongoose')
import { generateResetOtp, generateToken } from '../utils/user.util'
import dotenv from 'dotenv'
import { NotBeforeError } from 'jsonwebtoken'
import httpStatus from 'http-status'

dotenv.config()

exports.getUsers = async () => {
    try {
        return await User.find()
    } catch (err) {
        throw err
    }
}

exports.registerUser = async (req,res) => {
    try {
        const { name, email, phone, password } = req.validatedBody;

        if (!name || !email || !password) {
            const error = new Error('Invalid input')
            error.code = 400
            throw error
        }

        if (await checkUserExist(email)) {
            const error = new Error('User already exists')
            error.code = 400
            throw error
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
            const error = new Error('Invalid input')
            error.code = 400
            throw error
        }

        const user = await checkUserExist(email);

        

        if (!user) {
            const error = new Error('User not found')
            error.code = 404
            throw error
        }

        const passwordMatch = await comparePassword(password, user.password);


        if (!passwordMatch) {
            const error = new Error('Incorrect password')
            error.code = 401
            throw error
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

let resetToken = ''

export const forgetPasswordService = async (req) => {
    try{
        const {email} = req.body

        if(!email){
            throw new Error('Invalid input')
        }

        const user = await checkUserExist(email)

        if(!user){
            throw new Error('User not found')
        }

        const otp = generateResetOtp()

        console.log("otp", otp)

        resetToken = otp

        return {resetToken, email}

    }catch(err){
        throw err
    }
}


export const resetPasswordService = async (req) => {
    try{
        const {otp, password, email} = req.body

        if(!otp || !password || !email){
            throw new Error('Invalid input')
        }

        if(! await checkUserExist(email)){
            throw new Error('User not found')
        }

        if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)){
            throw new Error('Invalid password')
        }

        if(otp !== resetToken){ 
            const error = new Error('Invalid OTP')
            error.code = 400
            throw error
        }

        resetToken = null

        const hashedPassword = await bcrypt.hash(password, 10)

        const updatedPasswordUser = await User.findOneAndUpdate({email},{
            password: hashedPassword
        })

        return updatedPasswordUser
    }catch(err){
        throw err
    }
}