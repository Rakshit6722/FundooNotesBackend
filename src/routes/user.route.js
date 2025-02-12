import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/getUsers', userAuth, userController.getUsers);
router.post('/register', newUserValidator, userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgetPassword', userAuth, userController.forgetPassword)

export default router;
