import mongoose from "mongoose";

const Schema = new mongoose.Schema({
     
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    actionItems: {
        type: [{description: String, completed: Boolean}],
        default: []
    },
    createdDate: {
        type: String
    }
});

const models = mongoose.model('meetingNotes', Schema);

export default models;