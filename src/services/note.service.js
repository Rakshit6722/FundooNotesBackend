import Note from '../models/note.model'
import httpStatus from 'http-status'

export const createNoteService = async (req) => {
    try {
        const { title, description } = req.body

        if (!title || !description) {
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
    } catch (err) {
        throw err
    }
}

export const getNotesService = async (req) => {
    try {
        const notes = await Note.find({
            userId: req.user.id,
            isTrash: false
        })
        return notes
    } catch (err) {
        throw err
    }
}

export const updateNoteService = async (req) => {
    try {
        const { title, description } = req.body
        const { _id } = req.params

        const note = await Note.findOne({
            _id,
            isTrash: false
        })

        if (!note) {
            throw Error({
                code: httpStatus.NOT_FOUND,
                message: 'Note not found'
            })
        }
        

        if (!_id) {
            throw Error({
                code: httpStatus.BAD_REQUEST,
                message: 'Invalid input'
            })
        }

        const updatedData = {}
        if (title) updatedData.title = title
        if (description) updatedData.description = description

        const noteToUpdate = await Note.findByIdAndUpdate(_id,
            updatedData,
            {
                new: true
            }
        )

        return noteToUpdate
    } catch (err) {
        throw err
    }
}

export const deleteNoteService = async (req) => {
    try {
        const { _id } = req.params
        const noteToDelete = await Note.findByIdAndUpdate(_id, {
            isTrash: true
        }, {
            new: true
        })

        return noteToDelete 

    } catch (err) {
        throw err
    }
}