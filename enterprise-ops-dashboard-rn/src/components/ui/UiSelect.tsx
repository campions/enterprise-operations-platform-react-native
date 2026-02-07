import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { List, TextInput } from 'react-native-paper';
import UiModal from './UiModal';

interface UiSelectOption<TValue extends string | number> {
  label: string;
  value: TValue;
}

interface UiSelectProps<TValue extends string | number> {
  label?: string;
  placeholder?: string;
  options: Array<UiSelectOption<TValue>>;
  selectedValue?: TValue;
  onSelect: (value: TValue) => void;
  testID?: string;
  accessibilityLabel?: string;
}

const UiSelect = <TValue extends string | number>({
  label,
  placeholder,
  options,
  selectedValue,
  onSelect,
  testID,
  accessibilityLabel
}: UiSelectProps<TValue>) => {
  const [visible, setVisible] = useState(false);

  const selectedOption = useMemo(() => options.find((opt) => opt.value === selectedValue), [options, selectedValue]);

  const handleSelect = (value: TValue) => {
    onSelect(value);
    setVisible(false);
  };

  return (
    <View>
      <TextInput
        label={label}
        value={selectedOption?.label ?? ''}
        placeholder={placeholder}
        editable={false}
        right={<TextInput.Icon icon="menu-down" onPress={() => setVisible(true)} />}
        onPressIn={() => setVisible(true)}
        testID={testID}
        accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
      />
      <UiModal visible={visible} onDismiss={() => setVisible(false)} testID={testID ? `${testID}-modal` : undefined}>
        <List.Section>
          {options.map((option) => (
            <List.Item
              key={option.value}
              title={option.label}
              onPress={() => handleSelect(option.value)}
              right={() => (option.value === selectedValue ? <List.Icon icon="check" /> : null)}
            />
          ))}
        </List.Section>
      </UiModal>
    </View>
  );
};

export default UiSelect;
