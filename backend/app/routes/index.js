import meetingNotesRouter from './meetingNotes-route.js';


const initializeRoutes = (app) => {
    app.use('/' , meetingNotesRouter);
}

export default initializeRoutes;