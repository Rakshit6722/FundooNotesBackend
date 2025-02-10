import User from '../models/user.model'
const mongoose = require('mongoose')

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