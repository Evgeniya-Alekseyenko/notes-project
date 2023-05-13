import React, { createContext, useState } from 'react';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(false);
    const [isEditing, setIsEditing] = useState();
    const [searchQuery, setSearchQuery] = useState('');

    const onEditNote = () => {
        setIsEditing(!isEditing);
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setActiveNote(false);
    };

    const sortedNotes = notes
        .slice()
        .sort((a, b) => b.lastModified - a.lastModified)
        .filter(
            (note) =>
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.body.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const onUpdateNote = (updatedNote) => {
        const updatedNotesArr = notes.map((note) => {
            if (note.id === updatedNote.id) {
                return updatedNote;
            }

            return note;
        });

        setNotes(updatedNotesArr);
    };

    const getActiveNote = () => {
        return notes.find(({ id }) => id === activeNote);
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes,
                activeNote,
                setActiveNote,
                isEditing,
                setIsEditing,
                sortedNotes,
                searchQuery,
                setSearchQuery,
                onEditNote,
                onUpdateNote,
                getActiveNote,
                handleSearch,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
