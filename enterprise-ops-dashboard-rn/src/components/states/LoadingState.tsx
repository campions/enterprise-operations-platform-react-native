import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Surface, Text, useTheme } from 'react-native-paper';

interface LoadingStateProps {
  title: string;
  message?: string;
  rows?: number;
  onRetry?: () => void;
  testID?: string;
}

const LoadingState = ({ title, message, rows = 3, onRetry, testID }: LoadingStateProps) => {
  const theme = useTheme();
  const placeholders = Array.from({ length: rows }, (_, index) => index);

  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator />
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      {message ? (
        <Text variant="bodyMedium" style={styles.message}>
          {message}
        </Text>
      ) : null}
      <View style={styles.placeholderList}>
        {placeholders.map((index) => (
          <Surface
            key={`placeholder-${index}`}
            style={[styles.placeholderRow, { backgroundColor: theme.colors.surfaceVariant }]}
            elevation={0}
          />
        ))}
      </View>
      {onRetry ? <Button onPress={onRetry}>Retry</Button> : null}
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
  },
  placeholderList: {
    width: '100%',
    gap: 12,
    marginTop: 8
  },
  placeholderRow: {
    height: 14,
    borderRadius: 8
  }
});

export default LoadingState;
