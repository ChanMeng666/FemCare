import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../themes';
import { Theme } from '../types/theme';
import { storageService } from '../services/storage';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            const settings = await storageService.getUserSettings();
            setIsDarkMode(settings.darkMode || false);
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        await storageService.updateUserSettings({ darkMode: newDarkMode });
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}
