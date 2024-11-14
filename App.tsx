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
import { themes } from './src/themes';

function Main() {
    const { theme } = useThemeContext();

    return (
        <PaperProvider theme={themes[theme]}>
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
