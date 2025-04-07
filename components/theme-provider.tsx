import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { PaletteMode } from '@mui/material';

// Create context to manage theme mode
type ThemeContextType = {
    mode: PaletteMode;
    toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleColorMode: () => { },
});

// Custom hook to use the theme context
export const useColorMode = () => useContext(ThemeContext);

// Component to provide theme context
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<PaletteMode>('light');

    // Function to toggle between light and dark modes
    const toggleColorMode = useCallback(() => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }, []);

    // Create theme based on current mode
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'dark'
                        ? {
                            primary: {
                                main: '#90caf9',
                            },
                            secondary: {
                                main: '#f48fb1',
                            },
                            background: {
                                default: '#121212',
                                paper: '#1e1e1e',
                            },
                        }
                        : {
                            primary: {
                                main: '#1976d2',
                            },
                            secondary: {
                                main: '#e91e63',
                            },
                        }),
                },
                components: {
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                boxShadow: mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)',
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    const contextValue = useMemo(
        () => ({
            mode,
            toggleColorMode,
        }),
        [mode, toggleColorMode]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}