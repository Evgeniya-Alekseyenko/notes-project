import { Box, TextField, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export default function ListItem({
    activeNote,
    onUpdateNote,
    saveNote,
    isEditing,
}) {
    const onEditField = (field, value) => {
        const updatedNote = {
            ...activeNote,
            [field]: value,
            lastModified: Date.now(),
        };
        onUpdateNote(updatedNote);
        saveNote(updatedNote);
    };

    if (!activeNote)
        return (
            <Typography
                variant='h3'
                align='center'
                fontWeight='bold'
                color='#3CB371'
                sx={{ marginTop: '100px' }}
            >
                No Active Note
            </Typography>
        );

    return (
        <div>
            {!isEditing && (
                <>
                    <h1>{activeNote.title}</h1>
                    <ReactMarkdown className='markdown-preview'>
                        {activeNote.body}
                    </ReactMarkdown>
                </>
            )}
            {!isEditing &&
                activeNote.title === '' &&
                activeNote.body === '' && (
                    <Typography
                        variant='h3'
                        align='center'
                        fontWeight='bold'
                        color='#3CB371'
                        sx={{ marginTop: '100px' }}
                    >
                        <div>You haven't written anything yet.</div>
                        <div>
                            Please click the edit note button
                            <EditNoteOutlinedIcon
                                sx={{
                                    fontSize: '32px',
                                    color: '#3CB371',
                                    margin: '0 20px',
                                }}
                            />
                            on the taskbar
                        </div>
                    </Typography>
                )}
            {isEditing && (
                <>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#3CB371',
                            },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#3CB371',
                            },
                        }}
                    >
                        <TextField
                            fullWidth
                            label='Write a note title'
                            id='fullWidth'
                            value={activeNote.title}
                            onChange={(e) =>
                                onEditField('title', e.target.value)
                            }
                            variant='outlined'
                            color='success'
                            sx={{ width: '40vw', marginTop: '20px' }}
                        />
                    </Box>
                    <Box
                        sx={{
                            maxWidth: '100%',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#3CB371',
                            },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#3CB371',
                            },
                        }}
                    >
                        <TextField
                            multiline
                            rows={24}
                            id='body'
                            placeholder='Write your note...'
                            value={activeNote.body}
                            onChange={(e) =>
                                onEditField('body', e.target.value)
                            }
                            variant='outlined'
                            color='success'
                            sx={{
                                width: '70vw',
                                marginTop: '20px',
                            }}
                        />
                    </Box>
                </>
            )}
        </div>
    );
}
