import Note from '../models/note.model'
import httpStatus from 'http-status'

export const createNoteService = async (req) => {
    try{
        const {title, description} = req.body

        if(!title || !description){
            throw Error({
                code: httpStatus.BAD_REQUEST,
                message: 'Invalid input'
            })
        }

        const note = await Note.create({
            title,
            description,
            userId: req.user.id 
        })

        return note
    }catch(err){
        throw err
    }
}

export const getNotesService = async (req) => {
    try{
        const notes = await Note.find({
            userId: req.user.id,
            isTrash: false
        })
        return notes
    }catch(err){
        throw err
    }
}