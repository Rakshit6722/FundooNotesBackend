import { createNoteService, getNotesService, updateNoteService, deleteNoteService } from "../services/note.service"
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


exports.updateNote = async (req, res) => {
    try {
        const updatedNote = await updateNoteService(req);

        if (updatedNote) {
            return res.status(200).json({
                code: httpStatus.OK,
                data: updatedNote,
                message: 'Note updated successfully'
            })
        } else {
            return res.status(500).json({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Note not updated'
            })
        }
    } catch (err) {
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}

exports.deleteNote = async (req, res) => {
    try{
        const responseMessage = await deleteNoteService(req)

        if(responseMessage){
            return res.status(200).json({
                code: httpStatus.OK,
                message: responseMessage
            })
        }else{
            return res.status(500).json({
                code: httpStatus.INTERNAL_SERVER_ERROR,
                message: responseMessage
            })
        }

    }catch(err){
        return res.status(500).json({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}