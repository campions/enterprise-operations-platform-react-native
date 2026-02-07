import React, { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { appTheme } from '../theme/theme';
import queryClient from '../../data/queryClient';

const AppProviders = ({ children }: PropsWithChildren) => (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={appTheme}>{children}</PaperProvider>
    </QueryClientProvider>
  </SafeAreaProvider>
);

export default AppProviders;
