import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

export default function Sidebar({ notes, activeNote, setActiveNote }) {
    const sortedNotes = notes
        .slice()
        .sort((a, b) => b.lastModified - a.lastModified);

    return (
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {sortedNotes.map((note, index) => (
                    <React.Fragment key={index}>
                        <ListItem
                            disablePadding
                            className={`${note.id === activeNote && 'active'}`}
                            onClick={() => setActiveNote(note.id)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary={note.title} />
                            </ListItemButton>
                            <div>
                                <p>
                                    {note.body &&
                                        note.body.substr(0, 100) + '...'}
                                </p>
                                <Typography
                                    fontSize='12px'
                                    color='text.secondary'
                                    fontWeight='bold'
                                    sx={{ paddingLeft: '6px' }}
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
