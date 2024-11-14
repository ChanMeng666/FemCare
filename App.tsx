// import React from 'react';
// import { Provider as PaperProvider } from 'react-native-paper';
// import AppNavigator from './src/navigation/AppNavigator';
// import { theme } from './src/constants/theme';
//
// export default function App() {
//   return (
//       <PaperProvider theme={theme}>
//         <AppNavigator />
//       </PaperProvider>
//   );
// }


import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { useThemeContext } from './src/contexts/ThemeContext';
import { lightTheme, darkTheme } from './src/themes'; // Fix import

function Main() {
    const { theme } = useThemeContext();
    // Use correct theme object based on mode
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <PaperProvider theme={currentTheme}>
            <AppNavigator />
        </PaperProvider>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <Main />
        </ThemeProvider>
    );
}
