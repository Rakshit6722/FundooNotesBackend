import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { createUser, checkUserExist } from '../services/user.service';

exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.validatedBody;

        if (!name || !email || !password) {
            return res.status(400).json({
                code: httpStatus.BAD_REQUEST,
                message: 'Invalid input'
            })
        }

        if(await checkUserExist(email)){
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
