const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
import { createUser } from '../services/user.service';

exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.validatedBody;

        if (!name || !email || !password) {
            return res.status(400).json({
                code: httpStatus.BAD_REQUEST,
                message: 'Invalid input'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await createUser(name, email, phone, hashedPassword);
            return res.status(201).json({
                code: httpStatus.CREATED,
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
