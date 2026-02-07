import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';

export interface StatCardProps {
  title: string;
  value: string;
  trendLabel?: string;
  trendValue?: number;
  variant?: 'neutral' | 'success' | 'warning';
}

const variantColor: Record<NonNullable<StatCardProps['variant']>, string> = {
  neutral: '#4E5D78',
  success: '#0A7E07',
  warning: '#B35C00'
};

const StatCard = ({ title, value, trendLabel, trendValue = 0, variant = 'neutral' }: StatCardProps) => (
  <Card style={styles.card}>
    <Card.Title title={title} titleVariant="titleMedium" titleStyle={styles.title} />
    <Card.Content>
      <Text variant="headlineLarge" style={styles.value}>
        {value}
      </Text>
      {trendLabel ? (
        <Text variant="bodyMedium" style={{ color: variantColor[variant] }}>
          {trendLabel}
        </Text>
      ) : null}
      {trendValue > 0 && <ProgressBar progress={trendValue} color={variantColor[variant]} style={styles.progress} />}
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    flex: 1
  },
  title: {
    color: '#4E5D78'
  },
  value: {
    marginBottom: 8
  },
  progress: {
    marginTop: 12,
    height: 6,
    borderRadius: 3
  }
});

export default StatCard;
