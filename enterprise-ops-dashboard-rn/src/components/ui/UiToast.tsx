import React from 'react';
import { Snackbar } from 'react-native-paper';

interface UiToastProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  testID?: string;
}

const UiToast = ({ visible, message, onDismiss, actionLabel, onAction, duration, testID }: UiToastProps) => (
  <Snackbar
    visible={visible}
    onDismiss={onDismiss}
    action={
      actionLabel
        ? {
            label: actionLabel,
            onPress: onAction
          }
        : undefined
    }
    duration={duration}
    testID={testID}
  >
    {message}
  </Snackbar>
);

export default UiToast;
