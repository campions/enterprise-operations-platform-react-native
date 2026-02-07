import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../../features/dashboard/screens/DashboardScreen';
import AppProviders from '../../app/providers/AppProviders';
import AssetDetailsScreen from '../../features/assets/screens/AssetDetailsScreen';

const Stack = createNativeStackNavigator();

const renderWithProviders = () =>
  render(
    <AppProviders>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="AssetDetails" component={AssetDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProviders>
  );

describe('DashboardScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('shows loading before rendering KPI cards', async () => {
    const { getByText, findAllByTestId } = renderWithProviders();

    expect(getByText('Loading dashboard')).toBeTruthy();

    await act(async () => {
      jest.runAllTimers();
    });

    const kpiCards = await findAllByTestId(/kpi-card-/);
    expect(kpiCards.length).toBeGreaterThan(0);
  });

  it('navigates to the asset details screen when a recent update is pressed', async () => {
    const { findByTestId, findByText } = renderWithProviders();

    await act(async () => {
      jest.runAllTimers();
    });

    const recentRow = await findByTestId('recent-update-asset-001');
    fireEvent.press(recentRow);

    await waitFor(async () => {
      expect(await findByText('Asset Details')).toBeTruthy();
    });
  });
});
