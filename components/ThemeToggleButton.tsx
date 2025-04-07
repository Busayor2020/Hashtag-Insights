import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from './theme-provider';

const ThemeToggleButton: React.FC = () => {
    const { mode, toggleColorMode } = useColorMode();

    return (
        <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton onClick={toggleColorMode} color="inherit" aria-label="toggle dark mode">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggleButton; 