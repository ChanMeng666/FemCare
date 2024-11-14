import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeType } from '../types/theme';
import { themes } from '../themes';
import { storageService } from '../services/storage';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeType>('pink');

    useEffect(() => {
        // 加载保存的主题设置
        const loadTheme = async () => {
            const settings = await storageService.getUserSettings();
            if (settings.theme) {
                setThemeState(settings.theme);
            }
        };
        loadTheme();
    }, []);

    const setTheme = async (newTheme: ThemeType) => {
        setThemeState(newTheme);
        await storageService.updateUserSettings({ theme: newTheme });
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
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
