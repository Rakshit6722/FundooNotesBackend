import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', userAuth, noteController.getNotes);
router.post('/', userAuth, noteController.createNote);
router.put('/updateNote/:_id', userAuth, noteController.updateNote)
router.delete('/deleteNote/:_id', userAuth, noteController.deleteNote)

export default router;
