// App.js
import React, { useEffect, useState } from 'react';
import BrandBar from './pages/BrandBar';
import Box from '@mui/material/Box';
import MeetingNotes from './pages/MeetingNotes';
import './App.css';
import { sampleNotes, SampleNotes } from './models/SampleNotes';
import * as client from './client';

function App() {
    const [notes, setNotes] = useState((sampleNotes.map(note => ({ ...note, isEditing: false }))));

    useEffect(() => {
        client.getNotes().then((data) => {
            data.map((e:SampleNotes) => ({...e, isEditing : false}));
            setNotes(data);
        });
    },[]);

    const handleAddMeeting = (newMeeting: SampleNotes) => {
        setNotes([...notes, { ...newMeeting, isEditing: false }]);
        console.log(newMeeting);
        client.postNotes(newMeeting);
    };

    const handleContentChange = (index: number, newContent: string) => {
        const updatedNotes = [...notes];
        updatedNotes[index].content = newContent;
        setNotes(updatedNotes);
    };

    const handleTitleChange = (index: number, newTitle: string) => {
        const updatedNotes = [...notes];
        updatedNotes[index].title = newTitle;
        setNotes(updatedNotes);
    };

    const handleActionItemsChange = (index: number, newActionItems: { description: string; completed: boolean }[]) => {
        const updatedNotes = [...notes];
        updatedNotes[index].actionItems = newActionItems;
        setNotes(updatedNotes);
    };

    const handleSave = (index: number) => {
        // Logic for saving a note

        console.log("Note saved:", notes[index]);
        const updatedNotes = [...notes];
        updatedNotes[index].isEditing = false; // Set isEditing to false after saving
        setNotes(updatedNotes);
        client.editNotes(notes[index]);
        console.log(notes[index]);
    };

    const handleEditClick = (index: number) => {
        // Logic for edit click
        console.log("Edit button clicked");
        const updatedNotes = [...notes];
        updatedNotes[index].isEditing = true; // Set isEditing to true when clicking edit
        setNotes(updatedNotes);
    };

    const handleDelete = (index: number) => {
        // Logic for deleting a note
        console.log("Note deleted:", notes[index]);
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1); // Remove the note at the specified index
        setNotes(updatedNotes);
        client.deleteNotes(notes[index]);
    };
    const handleSearch = async (keywords: string, startDate: String | null, endDate: String | null) => {
        try {
            console.log("Searching for notes with keywords:", keywords);
            console.log("Start Date:", startDate);
            console.log("End Date:", endDate);
    
            const searchResults = await client.searchNotes(keywords, startDate, endDate);
    
            if (searchResults) {
                setNotes(searchResults.map((note: any) => ({ ...note, isEditing: false })));
            } else {
                console.log('No search results found.');
            }
        } catch (error) {
            console.error('Error searching notes:', error);
        }
    };
    

    const boxes = notes.map((note, index) => (
        <Box key={index} component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <MeetingNotes 
                note={note} 
                isEditing={note.isEditing || false} 
                editedContent={note.content} 
                editedTitle={note.title}
                editedActionItems={note.actionItems}
                onContentChange={(newContent) => handleContentChange(index, newContent)} 
                onTitleChange={(newTitle) => handleTitleChange(index, newTitle)}
                onActionItemsChange={(newActionItems) => handleActionItemsChange(index, newActionItems)}
                onSave={() => handleSave(index)} 
                onEditClick={() => handleEditClick(index)}
                onDelete={() => handleDelete(index)} // Pass the handleDelete function
            />
        </Box>
    ));

    return (
        <>
            <BrandBar onAddMeeting={handleAddMeeting} onSearch = {handleSearch}/>
            {boxes}
        </>
    );
}

export default App;
