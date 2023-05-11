import ReactMarkdown from 'react-markdown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

export default function ListItem(activeNote) {
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
                    variant='outlined'
                    color='success'
                    sx={{ width: '30vw', marginTop: '20px' }}
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
                    rows={5}
                    id='body'
                    placeholder='Write your note...'
                    value={activeNote.body}
                    variant='outlined'
                    color='success'
                    sx={{ width: '30vw', marginTop: '20px' }}
                />
            </Box>
            <h2>Preview</h2>
            <h1>{activeNote.title}</h1>
            <ReactMarkdown className='markdown-preview'>
                {activeNote.body}
            </ReactMarkdown>
        </div>
    );
}
