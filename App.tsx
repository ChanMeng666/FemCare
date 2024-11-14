import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/constants/theme';

export default function App() {
  return (
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
  );
}
