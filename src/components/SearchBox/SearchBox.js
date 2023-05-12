import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
} from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchBox({
    activeNote,
    onAddNote,
    onDeleteNote,
    onEditNote,
}) {
    const [openDialog, setOpenDialog] = React.useState(false);

    const [isEditing, setIsEditing] = React.useState(false);

    const handleEditNote = () => {
        setIsEditing(!isEditing);
        onEditNote && onEditNote();
    };

    const handleDeleteNote = () => {
        setOpenDialog(true);
    };
    const handleConfirmDelete = () => {
        onDeleteNote && onDeleteNote(activeNote);
        setOpenDialog(false);
    };
    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' sx={{ background: '#3CB371' }}>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        sx={{ mr: 2 }}
                        onClick={onAddNote}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        sx={{ mr: 2 }}
                        onClick={() => onDeleteNote(activeNote)}
                        onMouseDown={handleDeleteNote}
                        disabled={!activeNote}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    <Tooltip title={isEditing ? 'Save Changes' : 'Edit Note'}>
                        <span>
                            <IconButton
                                size='large'
                                edge='start'
                                color='inherit'
                                aria-label='open drawer'
                                sx={{ mr: 2 }}
                                onClick={handleEditNote}
                                disabled={!activeNote}
                            >
                                {isEditing ? (
                                    <SaveIcon />
                                ) : (
                                    <EditNoteOutlinedIcon />
                                )}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        Notes
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='Search…'
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this note?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleConfirmDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
