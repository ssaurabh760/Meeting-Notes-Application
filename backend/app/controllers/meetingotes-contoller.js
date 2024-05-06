import * as meetingNotesService from './../services/meetingNotes-service.js';
import { setResponse, setError } from './response-handler.js';

export const search = async (request, response) => {
    try {
        const { keywords, startDate, endDate } = request.query;
        console.log(request.query);
        const filteredMeetingNotes = await meetingNotesService.search(keywords, startDate, endDate);
        response.status(200).json(filteredMeetingNotes);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }

}

export const post = async (request, response) => {
    try{
        const notes = {...request.body};
        const meetingNotes = await meetingNotesService.save(notes);
        setResponse(meetingNotes, response);

    }catch(error){
        setError(error, response);
    }


}

export const get = async (request, response) => {
    try{
        const notes = await meetingNotesService.get(request.params.id);
        
        setResponse(notes, response);

    }catch(error){
        setError(error, response);
    }

}
export const put = async (request, response) => {
    try {
        const { id } = request.params;
        const newData = { ...request.body };
        const updatedNote = await meetingNotesService.put(id, newData);
        setResponse(updatedNote, response);
    } catch (error) {
        setError(error, response);
    }
}

export const remove = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedNote = await meetingNotesService.remove(id);
        setResponse(deletedNote, response);
    } catch (error) {
        setError(error, response);
    }
}

export const getAll = async (request, response) => {
    try {
        const notes = await meetingNotesService.getAll();
        setResponse(notes, response);
    } catch (error) {
        setError(error, response);
    }
}