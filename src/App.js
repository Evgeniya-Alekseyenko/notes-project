import * as React from 'react';
import Workspace from './components/Workspace/Workspace';
import { NotesProvider } from './components/context/context';

function App() {
    return (
        <NotesProvider>
            <Workspace />
        </NotesProvider>
    );
}

export default App;
