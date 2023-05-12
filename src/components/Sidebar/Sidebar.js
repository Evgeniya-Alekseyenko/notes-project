import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';

export default function Sidebar({
    notes,
    activeNote,
    setActiveNote,
    setIsEditing,
}) {
    const sortedNotes = notes
        .slice()
        .sort((a, b) => b.lastModified - a.lastModified);

    const onclickNote = (id) => {
        if (activeNote !== id) {
            setIsEditing(false);
        }
        setActiveNote(id);
    };

    return (
        <Box sx={{ overflow: 'auto', cursor: 'pointer' }}>
            <List>
                {sortedNotes.map((note, index) => (
                    <React.Fragment key={index}>
                        <ListItem
                            disablePadding
                            className={`${note.id === activeNote && 'active'}`}
                            onClick={() => onclickNote(note.id)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                paddingLeft: '6px',
                            }}
                        >
                            <Typography
                                fontSize='20px'
                                color='text.secondary'
                                fontWeight='bold'
                            >
                                {note.title ? note.title : 'Untitled'}
                            </Typography>
                            <div>
                                <Typography
                                    fontSize='16px'
                                    color='text.secondary'
                                >
                                    {note.body &&
                                        note.body.substr(0, 20) + '...'}
                                </Typography>
                                <Typography
                                    fontSize='12px'
                                    color='text.secondary'
                                    fontWeight='bold'
                                >
                                    Last modified{' '}
                                    {new Date(
                                        note.lastModified
                                    ).toLocaleDateString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </Typography>
                            </div>
                        </ListItem>
                        {index < notes.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
