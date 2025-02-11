import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/getNotes', userAuth, noteController.getNotes);
router.post('/createNote', userAuth, noteController.createNote);


export default router;
