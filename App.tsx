import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { lightTheme } from './src/styles/theme';

export default function App() {
    return (
        <ThemeProvider>
            <PaperProvider theme={lightTheme}>
                <AppNavigator />
            </PaperProvider>
        </ThemeProvider>
    );
}
