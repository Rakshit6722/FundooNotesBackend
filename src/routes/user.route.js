import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', userAuth, userController.getUsers);
router.post('/', newUserValidator, userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgetPassword', userController.forgetPassword)
router.put('/resetPassword', userController.resetPassword)

export default router;
