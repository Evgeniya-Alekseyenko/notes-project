import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { NotesContext } from '../context/context';
import SearchBox from '../SearchBox/SearchBox';
import Sidebar from '../Sidebar/Sidebar';
import ListItem from '../ListItem/ListItem';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

const drawerWidth = 240;

export default function Workspace() {
    const { notes, setNotes, setActiveNote, setIsEditing } =
        useContext(NotesContext);

    const [db, setDb] = useState(null);

    useEffect(() => {
        const request = indexedDB.open('notes_db', 1);

        request.onerror = (event) => {
            console.log('Database error: ', event.target.errorCode);
        };

        request.onsuccess = (event) => {
            console.log('Database opened successfully');
            const database = event.target.result;
            setDb(database);

            const transaction = database.transaction('notes', 'readonly');
            const store = transaction.objectStore('notes');

            const notesRequest = store.getAll();
            notesRequest.onsuccess = () => {
                setNotes(notesRequest.result);
            };
        };
        request.onupgradeneeded = (event) => {
            console.log('Database upgrade needed');
            const database = event.target.result;
            const objectStore = database.createObjectStore('notes', {
                keyPath: 'id',
            });

            objectStore.createIndex('title', 'title', { unique: false });

            console.log('Database upgrade complete');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveNote = (note) => {
        const transaction = db.transaction('notes', 'readwrite');
        const store = transaction.objectStore('notes');
        const request = store.put(note);

        request.onsuccess = () => {
            console.log('Note saved successfully');
        };

        request.onerror = () => {
            console.log('Error saving note');
        };
    };

    const onAddNote = () => {
        const newNote = {
            id: uuidv4(),
            title: '',
            body: '',
            lastModified: Date.now(),
        };
        setIsEditing(true);
        setNotes([newNote, ...notes]);
        setActiveNote(newNote.id);
        saveNote(newNote);
    };
    const onDeleteNote = (noteId) => {
        const transaction = db.transaction('notes', 'readwrite');
        const store = transaction.objectStore('notes');

        const request = store.delete(noteId);

        request.onsuccess = () => {
            console.log('Note deleted successfully');
            setNotes(notes.filter(({ id }) => id !== noteId));
            setActiveNote(false);
        };

        request.onerror = () => {
            console.log('Error deleting note');
        };
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <SearchBox onAddNote={onAddNote} onDeleteNote={onDeleteNote} />
            </AppBar>
            <Drawer
                variant='permanent'
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <Sidebar />
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box component='main' sx={{ flexGrow: 2, p: 3 }}>
                <Toolbar />
                <ListItem saveNote={saveNote} />
            </Box>
        </Box>
    );
}
