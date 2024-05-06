import express from 'express';
import * as meetingNotesController from './../controllers/meetingotes-contoller.js'

const router = express.Router();

router.route('/meetingNotes')
    .get(meetingNotesController.getAll)
    .post(meetingNotesController.post)
;

router.route('/search')
    .get(meetingNotesController.search)
;

router.route('/meetingNotes/:id')
    .get(meetingNotesController.get)
    .put(meetingNotesController.put)
    .delete(meetingNotesController.remove);
    

;

export default router;



