import MeetingNotes from './../models/meetingNotes.js';

/**
 * Search and return notes
 * @param {*} params 
 * @returns 
 */
export const search = async (keywords, startDate, endDate) => {
    const query = {};

    if (keywords) {
        query.$or = [
            { title: { $regex: keywords, $options: 'i' } },
            { content: { $regex: keywords, $options: 'i' } },
            { actionItems: { $elemMatch: { $regex: keywords, $options: 'i' } } }
        ];
    }

    if (startDate && endDate) {
        query.createdDate = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
        query.createdDate = { $gte: startDate };
    } else if (endDate) {
        query.createdDate = { $lte:endDate };
    }

    return await MeetingNotes.find(query).exec();
}

/**
 * Save Notes
 * @param {} notes 
 * @returns 
 */

export const save = async(notes) => {
    const meetingNotes = new MeetingNotes(notes);
    return meetingNotes.save();
}

/**
 * Retrieve a single Meeting Notes Object
 * @param {} id 
 * @returns 
 */

export const get = async(id) => {
    const notes = await MeetingNotes.findById(id).exec();
    return notes;
}
export const put = async (id, newData) => {
    try {
        const updatedNote = await MeetingNotes.findByIdAndUpdate(id, newData, { new: true }).exec();
        if (!updatedNote) {
            throw new Error("Meeting note not found");
        }
        return updatedNote;
    } catch (error) {
        throw new Error("Error while updating meeting note");
    }
}

// Delete a MeetingNote
export const remove = async (id) => {
    try {
        const deletedNote = await MeetingNotes.findByIdAndDelete(id).exec();
        if (!deletedNote) {
            throw new Error("Meeting note not found");
        }
        return deletedNote;
    } catch (error) {
        throw new Error("Error while deleting meeting note");
    }
}

export const getAll = async (request, response) => {
    try {
        const notes = await MeetingNotes.find().exec();
        return notes;
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}