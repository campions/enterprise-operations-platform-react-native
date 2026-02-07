import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
}

const SectionHeader = ({ title, action }: SectionHeaderProps) => (
  <View style={styles.container}>
    <Text variant="titleMedium">{title}</Text>
    {action}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default SectionHeader;
