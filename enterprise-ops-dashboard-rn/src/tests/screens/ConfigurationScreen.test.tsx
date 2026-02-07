import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import ConfigurationScreen from '../../features/configuration/ConfigurationScreen';
import AppProviders from '../../app/providers/AppProviders';

const renderWithProviders = () =>
  render(
    <AppProviders>
      <ConfigurationScreen />
    </AppProviders>
  );

describe('ConfigurationScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('prevents saving when invalid and surfaces validation errors', async () => {
    const { findByTestId, getByTestId, getByText } = renderWithProviders();

    await act(async () => {
      jest.runAllTimers();
    });

    const nameInput = await findByTestId('config-site-name');
    fireEvent.changeText(nameInput, 'ab');

    const refreshInput = getByTestId('config-refresh');
    fireEvent.changeText(refreshInput, '2');

    const saveButton = getByTestId('config-save');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByText('Site name must be at least 3 characters.')).toBeTruthy();
      expect(getByText('Refresh interval must be between 5 and 300 seconds.')).toBeTruthy();
    });
  });

  it('saves valid changes and shows a toast', async () => {
    const { findByTestId, getByTestId, getByText } = renderWithProviders();

    await act(async () => {
      jest.runAllTimers();
    });

    const nameInput = await findByTestId('config-site-name');
    fireEvent.changeText(nameInput, 'Ops Control Center');

    const saveButton = getByTestId('config-save');
    fireEvent.press(saveButton);

    await waitFor(() => expect(getByText('Configuration saved successfully')).toBeTruthy());
  });

  it('resets changes when cancel is confirmed', async () => {
    const { findByTestId, getByTestId } = renderWithProviders();

    await act(async () => {
      jest.runAllTimers();
    });

    const nameInput = await findByTestId('config-site-name');
    fireEvent.changeText(nameInput, 'Temp Name');

    const cancelButton = getByTestId('config-cancel');
    fireEvent.press(cancelButton);

    const confirmReset = await findByTestId('config-confirm-reset');
    fireEvent.press(confirmReset);

    await waitFor(() => expect(nameInput.props.value).toBe('Enterprise Ops HQ'));
  });
});
