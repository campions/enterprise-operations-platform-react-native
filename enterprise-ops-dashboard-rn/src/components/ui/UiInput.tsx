import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface UiInputProps {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  multiline?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

const UiInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  multiline,
  style,
  testID,
  accessibilityLabel
}: UiInputProps) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
    multiline={multiline}
    style={style}
    testID={testID}
    accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
  />
);

export default UiInput;
