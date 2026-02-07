import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface ErrorStateProps {
  title: string;
  message: string;
  icon?: IconSource;
  onRetry?: () => void;
  testID?: string;
}

const ErrorState = ({ title, message, icon = 'alert-circle-outline', onRetry, testID }: ErrorStateProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container} testID={testID}>
      <Icon source={icon} size={40} color={theme.colors.error} />
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.message}>
        {message}
      </Text>
      {onRetry ? (
        <Button mode="contained" onPress={onRetry}>
          Retry
        </Button>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    gap: 8
  },
  title: {
    textAlign: 'center'
  },
  message: {
    textAlign: 'center'
  }
});

export default ErrorState;
