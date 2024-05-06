import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

interface Note {
    title: string;
    content: string;
    createdDate: Date;
    actionItems: { description: string; completed: boolean }[];
}

interface MeetingNotesProps {
    note: Note;
    isEditing: boolean;
    editedContent: string;
    editedTitle: string;
    editedActionItems: { description: string; completed: boolean }[];
    onContentChange: (newContent: string) => void;
    onTitleChange: (newTitle: string) => void;
    onActionItemsChange: (newActionItems: { description: string; completed: boolean }[]) => void;
    onSave: () => void;
    onEditClick: () => void;
    onDelete: () => void;
}

function MeetingNotes({ note, isEditing, editedContent, editedTitle, editedActionItems, onContentChange, onTitleChange, onActionItemsChange, onSave, onEditClick, onDelete }: MeetingNotesProps) {
    
    return (
        <ul>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {isEditing ? (
                            <>
                                <Grid container spacing={2} direction="column">
                                    <Grid item xs={12}>
                                        <input type="text" value={editedTitle} onChange={(e) => onTitleChange(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <textarea value={editedContent} onChange={(e) => onContentChange(e.target.value)} rows={4} cols={50} />
                                    </Grid>
                                    {editedActionItems.map((actionItem, index) => (
                                        <Grid item xs={12} key={index}>
                                            <div>
                                                <Checkbox checked={actionItem.completed} onChange={(e) => {
                                                    const updatedActionItems = [...editedActionItems];
                                                    updatedActionItems[index].completed = e.target.checked;
                                                    onActionItemsChange(updatedActionItems);
                                                }} />
                                                <input type="text" value={actionItem.description} onChange={(e) => {
                                                    const updatedActionItems = [...editedActionItems];
                                                    updatedActionItems[index].description = e.target.value;
                                                    onActionItemsChange(updatedActionItems);
                                                }} />
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" onClick={onSave}>Save</Button>
                                    <Button variant="contained" color="error" onClick={onDelete}>Delete</Button>
                                </Stack>
                            </>
                        ) : (
                            <>
                                <h2>{note.title}</h2>
                                <p>{note.content}</p>
                                <p>{note.createdDate.toString()}</p>
                                <FormGroup>
                                    {note.actionItems.map((actionItem, index) => (
                                        <FormControlLabel
                                            key={index}
                                            control={<Checkbox checked={actionItem.completed} onChange={(e) => {
                                                const updatedActionItems = [...note.actionItems]; // Use note.actionItems here
                                                updatedActionItems[index].completed = e.target.checked;
                                                onActionItemsChange(updatedActionItems);
                                            }} />}
                                            label={actionItem.description}
                                        />
                                    ))}
                                </FormGroup>
                                <Button variant="contained" onClick={onEditClick}>Edit</Button>
                                <div style={{ height: 10 }}></div> 
                                <Button variant="contained" color="error" onClick={onDelete}>Delete</Button>
                            </>
                        )}
                    </Grid>
                </Grid>
            </div>
        </ul>
    );
}

export default MeetingNotes;
