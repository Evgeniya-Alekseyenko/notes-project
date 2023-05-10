import * as React from 'react';

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
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <SearchBox />
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
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <ListItem />
            </Box>
        </Box>
    );
}
