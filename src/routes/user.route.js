import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', userAuth, userController.getUsers);
router.post('/', newUserValidator, userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/:id', userAuth, userController.updateUser);
router.delete('/:id', userAuth, userController.deleteUser);
router.post('/forgetPassword', userController.forgetPassword)
// router.put('/resetPassword', userController.resetPassword)

export default router;
