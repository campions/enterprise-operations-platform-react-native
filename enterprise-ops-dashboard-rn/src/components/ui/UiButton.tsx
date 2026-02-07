import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

export type UiButtonMode = Exclude<ButtonProps['mode'], undefined>;

interface UiButtonProps {
  label: string;
  onPress: () => void;
  mode?: UiButtonMode;
  disabled?: boolean;
  loading?: boolean;
  icon?: ButtonProps['icon'];
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

const UiButton = ({
  label,
  onPress,
  mode = 'contained',
  disabled = false,
  loading = false,
  icon,
  compact,
  style,
  testID,
  accessibilityLabel
}: UiButtonProps) => (
  <Button
    mode={mode}
    onPress={onPress}
    disabled={disabled}
    loading={loading}
    icon={icon}
    compact={compact}
    style={style}
    testID={testID}
    accessibilityLabel={accessibilityLabel ?? label}
  >
    {label}
  </Button>
);

export default UiButton;
