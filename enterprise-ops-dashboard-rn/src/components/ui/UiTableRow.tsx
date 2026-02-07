import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

interface UiTableRowProps {
  title: string;
  description?: string;
  meta?: string;
  left?: ReactNode;
  right?: ReactNode;
  onPress?: () => void;
  testID?: string;
}

const UiTableRow = ({ title, description, meta, left, right, onPress, testID }: UiTableRowProps) => {
  const theme = useTheme();
  const Wrapper = onPress ? TouchableRipple : View;

  return (
    <Wrapper onPress={onPress} testID={testID} style={[styles.wrapper, { borderColor: theme.colors.surfaceVariant }]}>
      <View style={styles.row}>
        {left ? <View style={styles.left}>{left}</View> : null}
        <View style={styles.body}>
          <Text variant="titleMedium">{title}</Text>
          {description ? (
            <Text variant="bodySmall" style={styles.description}>
              {description}
            </Text>
          ) : null}
        </View>
        {meta ? (
          <Text variant="bodySmall" style={styles.meta}>
            {meta}
          </Text>
        ) : null}
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E0E4EB'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  left: {
    marginRight: 12
  },
  body: {
    flex: 1
  },
  description: {
    opacity: 0.7
  },
  meta: {
    marginLeft: 12
  },
  right: {
    marginLeft: 12
  }
});

export default UiTableRow;
