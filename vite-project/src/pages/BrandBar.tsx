import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField'; // Import TextFieldProps
import { SampleNotes } from './../models/SampleNotes';

interface BrandBarProps {
    onAddMeeting: (newMeeting: SampleNotes) => void;
    onSearch?: (keywords: string, startDate: String | null, endDate: String | null) => void;
}

function BrandBar({ onAddMeeting, onSearch }: BrandBarProps) {
    const [openAdd, setOpenAdd] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [actionItems, setActionItems] = useState<{ description: string; completed: boolean; }[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [keywords, setKeywords] = useState('');
    const [startDate, setStartDate] = useState<String | null>(null);
    const [endDate, setEndDate] = useState<String | null>(null);

    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleSave = () => {
        const createdDate = selectedDate ?? new Date();
        const newMeeting: SampleNotes = { title, content, actionItems, createdDate };
        onAddMeeting(newMeeting);
        handleCloseAdd();
    };

    const handleActionItemsChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const inputActionItems = e.target.value.split('\n').map(description => ({ description, completed: false }));
        setActionItems(inputActionItems);
    };

    const handleOpenSearch = () => {
        setOpenSearch(true);
    };

    const handleCloseSearch = () => {
        setOpenSearch(false);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(keywords, startDate, endDate);
        }
        handleCloseSearch();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Meeting Notes
                    </Typography>
                    <Button color="inherit" onClick={handleOpenSearch}>Search</Button>
                    <Button color="inherit" onClick={handleOpenAdd}>Add</Button>
                </Toolbar>
            </AppBar>
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Add New Meeting</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Action Items"
                        fullWidth
                        multiline
                        rows={4}
                        value={actionItems.map(item => item.description).join('\n')}
                        onChange={handleActionItemsChange}
                    />
                    <TextField
                        margin="dense"
                        label="Choose a Date"
                        fullWidth
                        type="date"
                        value={selectedDate ? selectedDate.toISOString().substr(0, 10) : ''}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openSearch} onClose={handleCloseSearch}>
                <DialogTitle>Search Meetings</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Keywords"
                        fullWidth
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Start Date"
                        fullWidth
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                   <TextField
                        margin="dense"
                        label="End Date"
                        fullWidth
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSearch}>Cancel</Button>
                    <Button onClick={handleSearch} color="primary">Search</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default BrandBar;
