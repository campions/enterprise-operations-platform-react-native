import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssetsScreen from '../../features/assets/AssetsScreen';
import AppProviders from '../../app/providers/AppProviders';
import AssetDetailsScreen from '../../features/assets/screens/AssetDetailsScreen';

const Stack = createNativeStackNavigator();

const renderWithProviders = () =>
  render(
    <AppProviders>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Assets" component={AssetsScreen} />
          <Stack.Screen name="AssetDetails" component={AssetDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProviders>
  );

describe('AssetsScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders filter input and asset rows', async () => {
    const { getByTestId, findByTestId } = renderWithProviders();

    expect(getByTestId('assets-filter-input')).toBeTruthy();

    await act(async () => {
      jest.runAllTimers();
    });

    const viewButton = await findByTestId('asset-asset-001-view');
    expect(viewButton).toBeTruthy();
  });

  it('filters the list when search text matches fewer assets', async () => {
    const { getByTestId, getAllByText } = renderWithProviders();

    await act(async () => {
      jest.runAllTimers();
    });

    const initialCount = getAllByText('View').length;

    const filterInput = getByTestId('assets-filter-input');
    fireEvent.changeText(filterInput, 'gateway 1');

    await waitFor(() => {
      expect(getAllByText('View').length).toBeLessThan(initialCount);
    });
  });

  it('navigates to asset details when the view button is pressed', async () => {
    const { findByTestId, findByText } = renderWithProviders();

    await act(async () => {
      jest.runAllTimers();
    });

    const viewButton = await findByTestId('asset-asset-001-view');
    fireEvent.press(viewButton);

    await waitFor(async () => {
      expect(await findByText('Asset Details')).toBeTruthy();
    });
  });

  it('allows editing an asset locally', async () => {
    const { findByTestId, getByTestId, getByText } = renderWithProviders();

    await act(async () => {
      jest.runAllTimers();
    });

    const editButton = await findByTestId('asset-asset-001-edit');
    fireEvent.press(editButton);

    const nameInput = await findByTestId('edit-asset-name');
    fireEvent.changeText(nameInput, 'Renamed Asset');

    const scoreInput = getByTestId('edit-asset-score');
    fireEvent.changeText(scoreInput, '99');

    const saveButton = getByTestId('edit-asset-save');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByText('Renamed Asset')).toBeTruthy();
    });
  });
});
