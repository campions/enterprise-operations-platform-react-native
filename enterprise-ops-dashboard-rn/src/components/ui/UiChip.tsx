import React from 'react';
import { Chip } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface UiChipProps {
  label: string;
  icon?: IconSource;
  selected?: boolean;
  compact?: boolean;
  onPress?: () => void;
  testID?: string;
}

const UiChip = ({ label, icon, selected, compact, onPress, testID }: UiChipProps) => (
  <Chip icon={icon} selected={selected} compact={compact} onPress={onPress} testID={testID}>
    {label}
  </Chip>
);

export default UiChip;
