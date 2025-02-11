import { createNoteService, getNotesService } from "../services/note.service"
import httpStatus from 'http-status'

exports.getNotes = async (req, res) => {
    try {
        const notes = await getNotesService(req)

        if (notes) {
            return res.status(200).json({
                code: httpStatus.OK,
                message: 'Notes fetched successfully',
                data: notes
            })
        } else {
            return res.status(500).json({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Notes not fetched'
            })
        }
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}

exports.createNote = async (req, res) => {
    try {
        const note = await createNoteService(req);

        console.log(note)

        if (note) {
            return res.status(201).json({
                code: httpStatus.CREATED,
                data: note,
                message: 'Note created successfully'
            })
        } else {
            return res.status(500).json({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Note not created'
            })
        }

    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }

}
