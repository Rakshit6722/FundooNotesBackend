import User from '../models/user.model'
import bcrypt from 'bcrypt'
const mongoose = require('mongoose')

exports.getUsers = async () => {
    try{
        return await User.find()
    }catch(err){
        throw err
    }
}

exports.createUser = async (name, email, phone, password) => {
    try{
        if(!name || !email || !password) {
            throw new Error('Invalid input')
        }

        const user = await User.create({
            name,
            email,
            phone,
            password
        })

        return user
        
    }catch(err){
        throw err
    }
}

exports.checkUserExist = async (email) => {
    try{
        const user = await User.findOne({email}).select('+password')
        return user
    }
    catch(err){
        throw err
    }
}

exports.comparePassword = async (password, hash) => {
    try{
        return await bcrypt.compare(password, hash)
    }catch(err){
        throw err
    }
}