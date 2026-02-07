import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AppProviders from './providers/AppProviders';
import RootNavigator from './navigation/RootNavigator';

const App = () => {
  return (
    <AppProviders>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <RootNavigator />
      </GestureHandlerRootView>
    </AppProviders>
  );
};

export default App;
