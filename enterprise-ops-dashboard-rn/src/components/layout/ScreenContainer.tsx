import React, { ReactNode } from 'react';
import { ScrollView, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const ScreenContainer = ({
  children,
  scrollable = true,
  style,
  contentContainerStyle
}: ScreenContainerProps) => {
  if (scrollable) {
    return (
      <ScrollView style={[styles.container, style]} contentContainerStyle={[styles.content, contentContainerStyle]}>
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.container, styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  content: {
    padding: 16,
    gap: 16
  }
});

export default ScreenContainer;
