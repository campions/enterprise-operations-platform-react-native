import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import UiCard from '../../../components/ui/UiCard';

interface KpiCardProps {
  label: string;
  value: number | string;
  delta?: number;
  unit?: string;
  testID?: string;
}

const formatValue = (value: number | string, unit?: string) =>
  typeof value === 'number' ? `${value}${unit ?? ''}` : value;

const formatDelta = (delta?: number, unit?: string) => {
  if (delta === undefined) {
    return undefined;
  }
  const prefix = delta > 0 ? '+' : '';
  const suffix = unit ?? '';
  return `${prefix}${delta}${suffix}`;
};

const getDeltaColor = (delta?: number) => {
  if (delta === undefined) {
    return styles.deltaNeutral.color;
  }
  if (delta > 0) {
    return styles.deltaPositive.color;
  }
  if (delta < 0) {
    return styles.deltaNegative.color;
  }
  return styles.deltaNeutral.color;
};

const KpiCard = ({ label, value, delta, unit, testID }: KpiCardProps) => {
  const formattedValue = formatValue(value, unit);
  const formattedDelta = formatDelta(delta, unit);
  const deltaColor = getDeltaColor(delta);

  return (
    <UiCard testID={testID} style={styles.card}>
      <Text variant="labelSmall" style={styles.label}>
        {label}
      </Text>
      <Text variant="headlineMedium" style={styles.value}>
        {formattedValue}
      </Text>
      {formattedDelta ? (
        <Text variant="bodyMedium" style={[styles.delta, { color: deltaColor }]}>
          {formattedDelta}
        </Text>
      ) : null}
    </UiCard>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    justifyContent: 'center'
  },
  label: {
    color: '#6B7A99',
    marginBottom: 4
  },
  value: {
    marginBottom: 8
  },
  delta: {
    fontWeight: '600'
  },
  deltaPositive: {
    color: '#0A7E07'
  },
  deltaNegative: {
    color: '#B00020'
  },
  deltaNeutral: {
    color: '#4E5D78'
  }
});

export default React.memo(KpiCard);
