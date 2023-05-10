import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function Sidebar({ notes, onDeleteNote }) {
    return (
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {notes.map((note, index) => (
                    <React.Fragment key={index}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary={note.title} />
                                <div>
                                    <strong>{note.title}</strong>
                                    <button
                                        onClick={() => onDeleteNote(note.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </ListItemButton>
                        </ListItem>
                        {index < notes.length - 1 && <Divider />}
                        <p>{note.body && note.body.substr(0, 100) + '...'}</p>
                        <small>
                            Last modified{' '}
                            {new Date(note.lastModified).toLocaleDateString(
                                'en-GB',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }
                            )}
                        </small>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
