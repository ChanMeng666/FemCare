import { useContext } from 'react';
import { Theme } from '../types/theme';
import { ThemeContext } from '../contexts/ThemeContext';

export function useTheme(): Theme {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context.theme;
}
